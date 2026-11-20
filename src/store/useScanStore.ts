import { create } from 'zustand';
import { SafeStorage } from '../utils/safeStorage';
import { ScanReport } from '../types/scan';

const SCAN_HISTORY_STORAGE_KEY = '@fskin_scan_history';

interface ScanState {
  currentReport: ScanReport | null;
  scanHistory: ScanReport[];
  isScanning: boolean;
  selectedImageUri: string | null;
  setCurrentReport: (report: ScanReport | null) => void;
  setSelectedImageUri: (uri: string | null) => void;
  saveCurrentReportToHistory: () => Promise<void>;
  loadScanHistory: () => Promise<void>;
  deleteScanFromHistory: (scanId: string) => Promise<void>;
  clearAllScanHistory: () => Promise<void>;
}

export const useScanStore = create<ScanState>((set, get) => ({
  currentReport: null,
  scanHistory: [],
  isScanning: false,
  selectedImageUri: null,

  setCurrentReport: report => set({ currentReport: report }),
  setSelectedImageUri: uri => set({ selectedImageUri: uri }),

  saveCurrentReportToHistory: async () => {
    const { currentReport, scanHistory } = get();
    if (!currentReport) return;

    // Prepend latest report to history, avoid duplicates
    const updated = [currentReport, ...scanHistory.filter(s => s.scanId !== currentReport.scanId)];
    set({ scanHistory: updated });

    try {
      await SafeStorage.setItem(SCAN_HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save scan history to storage', err);
    }
  },

  loadScanHistory: async () => {
    try {
      const stored = await SafeStorage.getItem(SCAN_HISTORY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ScanReport[];
        set({ scanHistory: parsed });
      }
    } catch (err) {
      console.warn('Failed to load scan history', err);
    }
  },

  deleteScanFromHistory: async scanId => {
    const { scanHistory, currentReport } = get();
    const updated = scanHistory.filter(s => s.scanId !== scanId);
    set({
      scanHistory: updated,
      currentReport: currentReport?.scanId === scanId ? null : currentReport,
    });

    try {
      await SafeStorage.setItem(SCAN_HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to delete scan from storage', err);
    }
  },

  clearAllScanHistory: async () => {
    set({ scanHistory: [], currentReport: null, selectedImageUri: null });
    try {
      await SafeStorage.removeItem(SCAN_HISTORY_STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to clear scan history', err);
    }
  },
}));
