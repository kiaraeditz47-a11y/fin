import React, { useState } from 'react';
import { 
  Pill, 
  FlaskConical, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Building2, 
  MapPin, 
  Info,
  Calendar,
  Filter
} from 'lucide-react';
import { MedicineItem, DiagnosticTestItem, Language } from '../types';
import { translations } from '../translations';

interface MedicinesDiagnosticsProps {
  medicines: MedicineItem[];
  diagnostics: DiagnosticTestItem[];
  language: Language;
}

export const MedicinesDiagnostics: React.FC<MedicinesDiagnosticsProps> = ({
  medicines,
  diagnostics,
  language
}) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'medicines' | 'diagnostics'>('medicines');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<'All' | 'In Stock' | 'Low Stock' | 'Out of Stock'>('All');

  // Filter medicines
  const filteredMedicines = medicines.filter((med) => {
    const facName = med.facilityName || med.facility || '';
    const stock = med.stockStatus || med.availability || '';
    const matchesSearch = 
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStock = stockFilter === 'All' || stock.toLowerCase().includes(stockFilter.toLowerCase()) || stockFilter.toLowerCase().includes(stock.toLowerCase());

    return matchesSearch && matchesStock;
  });

  // Filter diagnostic tests
  const filteredDiagnostics = diagnostics.filter((test) => {
    const facName = test.facilityName || test.facility || '';
    const prep = test.preparation || '';
    return (
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prep.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172026] tracking-tight">
            {t.navMedicinesDiagnostics}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {language === 'ta'
              ? 'கன்னியாகுமரி அரசு மருந்தகங்களின் நேரலை இருப்பு & மருத்துவ பரிசோதனைகள்'
              : 'Real-time drug inventory across public health dispensaries and clinical diagnostic availability'}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-teal-50 text-[#075E67] border border-teal-200 text-xs font-bold self-start">
          <Pill className="w-4 h-4 text-[#087F8C]" />
          <span>TNMSC Drug Warehouse Sync</span>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-3xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Main Tab Toggle */}
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <button
            onClick={() => setActiveTab('medicines')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'medicines'
                ? 'bg-[#087F8C] text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>{t.medicinesTab} ({medicines.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'diagnostics'
                ? 'bg-[#087F8C] text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>{t.diagnosticsTab} ({diagnostics.length})</span>
          </button>
        </div>

        {/* Search Input & Stock Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchMedicinesPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white rounded-2xl border border-gray-200 focus:border-[#087F8C] focus:ring-2 focus:ring-teal-100 text-xs sm:text-sm outline-hidden"
            />
          </div>

          {activeTab === 'medicines' && (
            <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto">
              {(['All', 'In Stock', 'Low Stock', 'Out of Stock'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStockFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                    stockFilter === st
                      ? 'bg-gray-900 text-white font-bold'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MEDICINES TAB CONTENT */}
      {activeTab === 'medicines' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Showing {filteredMedicines.length} government essential medicines</span>
            <span>All supplied free of cost under Tamil Nadu Public Health</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMedicines.map((med) => {
              return (
                <div
                  key={med.id}
                  className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-gray-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C] bg-teal-50 px-2 py-0.5 rounded">
                          {med.category}
                        </span>
                        <h4 className="font-bold text-gray-900 text-base mt-1">
                          {med.name}
                        </h4>
                        <div className="text-xs text-gray-500">Dosage: {med.dosage}</div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 ${
                        (med.stockStatus || med.availability) === 'Out of Stock'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : (med.stockStatus || med.availability) === 'Low Stock'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {(med.stockStatus || med.availability) === 'Out of Stock' ? (
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        ) : (med.stockStatus || med.availability) === 'Low Stock' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        <span>{med.stockStatus || med.availability}</span>
                      </span>
                    </div>

                    <div className="pt-2 text-xs text-gray-600 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" />
                        <span>Available at: <strong>{med.facilityName || med.facility}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>Stock count: {med.stockCount} units</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-800 font-bold">100% Free Supply</span>
                    <span className="font-mono text-gray-500">Batch: TNMSC-2026</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DIAGNOSTIC TESTS TAB CONTENT */}
      {activeTab === 'diagnostics' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Showing {filteredDiagnostics.length} diagnostic laboratory investigations</span>
            <span>Conducted on-site at primary & secondary health facilities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDiagnostics.map((test) => {
              return (
                <div
                  key={test.id}
                  className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-gray-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-gray-900 text-base">
                        {test.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Free (Govt)
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#087F8C]" />
                        <span>Turnaround time: <strong>{test.turnaroundTime || test.reportTurnaround}</strong></span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                        <span>Preparation: <strong className="text-gray-800">{test.preparation || 'Routine sample collection (No special fasting needed)'}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" />
                        <span>Facility: <strong>{test.facilityName || test.facility}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Walk-in OPD testing</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
