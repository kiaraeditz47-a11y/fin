import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Clock, 
  Building2, 
  ShieldAlert, 
  Pill, 
  FlaskConical, 
  ChevronRight, 
  Navigation,
  Compass,
  Layers,
  Calendar,
  Eye
} from 'lucide-react';
import { Facility, FacilityType, Language } from '../types';
import { translations } from '../translations';
import { FacilityDetailsModal } from './FacilityDetailsModal';

interface FindHealthcareProps {
  facilities: Facility[];
  language: Language;
  onBookAppointment: (facility: Facility) => void;
}

export const FindHealthcare: React.FC<FindHealthcareProps> = ({
  facilities,
  language,
  onBookAppointment
}) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [filterOpenNow, setFilterOpenNow] = useState(false);
  const [filterEmergency, setFilterEmergency] = useState(false);
  const [filterPharmacy, setFilterPharmacy] = useState(false);
  const [filterDiagnostics, setFilterDiagnostics] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [highlightedFacilityId, setHighlightedFacilityId] = useState<string | null>(null);

  const typeFilters = ['All', 'Sub-Centre', 'PHC', 'Rural Hospital', 'District Hospital'];

  // Filter facilities
  const filteredFacilities = facilities.filter((fac) => {
    // Search query filter
    const matchesSearch = 
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    // Type filter
    const matchesType = selectedType === 'All' || fac.type === selectedType;

    // Open now
    const matchesOpen = !filterOpenNow || fac.openStatus === 'Open';

    // Emergency care
    const matchesEmergency = !filterEmergency || fac.emergencyCare;

    // Pharmacy
    const matchesPharmacy = !filterPharmacy || fac.pharmacyStatus === 'Well-Stocked';

    // Diagnostics
    const matchesDiagnostics = !filterDiagnostics || fac.diagnosticsAvailability.length > 0;

    return matchesSearch && matchesType && matchesOpen && matchesEmergency && matchesPharmacy && matchesDiagnostics;
  });

  const handleOpenDetails = (fac: Facility) => {
    setSelectedFacility(fac);
    setIsDetailsModalOpen(true);
  };

  const handlePinClick = (fac: Facility) => {
    setHighlightedFacilityId(fac.id);
    const element = document.getElementById(`facility-card-${fac.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172026] tracking-tight">
            {t.findHealthcareTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {language === 'ta' 
              ? 'கன்னியாகுமரி மாவட்டம் முழுவதிலும் உள்ள அரசு மருத்துவமனைகள் & ஆரம்ப சுகாதார நிலையங்கள்' 
              : 'Discover public health facilities across Kanyakumari — from Sub-Centres to District Hospital'}
          </p>
        </div>

        {/* Location badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 shadow-xs self-start">
          <MapPin className="w-4 h-4 text-[#087F8C]" />
          <span>Near Kanyakumari (Cape Comorin)</span>
        </div>
      </div>

      {/* Search Bar & Filter Bar */}
      <div className="bg-white rounded-3xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchFacilitiesPlaceholder}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white rounded-2xl border border-gray-200 focus:border-[#087F8C] focus:ring-2 focus:ring-teal-100 text-xs sm:text-sm text-gray-800 placeholder-gray-400 transition-all outline-hidden"
          />
        </div>

        {/* Facility Type Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
          {typeFilters.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#087F8C] text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                }`}
              >
                {type === 'All' ? t.filterAll : type}
              </button>
            );
          })}
        </div>

        {/* Additional Toggle Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 text-xs">
          <button
            onClick={() => setFilterOpenNow(!filterOpenNow)}
            className={`px-3 py-1.5 rounded-xl font-medium border flex items-center gap-1.5 transition-colors ${
              filterOpenNow 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.openNow}</span>
          </button>

          <button
            onClick={() => setFilterEmergency(!filterEmergency)}
            className={`px-3 py-1.5 rounded-xl font-medium border flex items-center gap-1.5 transition-colors ${
              filterEmergency 
                ? 'bg-rose-50 border-rose-300 text-rose-800' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>{t.emergencyCare}</span>
          </button>

          <button
            onClick={() => setFilterPharmacy(!filterPharmacy)}
            className={`px-3 py-1.5 rounded-xl font-medium border flex items-center gap-1.5 transition-colors ${
              filterPharmacy 
                ? 'bg-teal-50 border-teal-300 text-[#075E67]' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Pill className="w-3.5 h-3.5 text-[#087F8C]" />
            <span>{t.pharmacy}</span>
          </button>

          <button
            onClick={() => setFilterDiagnostics(!filterDiagnostics)}
            className={`px-3 py-1.5 rounded-xl font-medium border flex items-center gap-1.5 transition-colors ${
              filterDiagnostics 
                ? 'bg-blue-50 border-blue-300 text-blue-800' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.diagnostics}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Facility Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Mock Map Component (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-5 shadow-xs sticky top-24">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#087F8C]" />
              <h3 className="font-bold text-gray-900 text-sm">
                {language === 'ta' ? 'கன்னியாகுமரி வரைபடம்' : 'District Geographic Map'}
              </h3>
            </div>
            <span className="text-[10px] uppercase font-bold text-gray-400">
              Interactive Pins
            </span>
          </div>

          {/* SVG Map of Kanyakumari Coastline */}
          <div className="relative w-full aspect-4/3 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
            {/* Background Ocean Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#0d223a] to-[#081a2e]" />

            {/* Coastline shape representation of southern Kanyakumari peninsula */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {/* Landmass of Kanyakumari district tapering to the cape at bottom right */}
              <path
                d="M 0,0 L 100,0 L 100,20 Q 90,45 80,65 Q 65,85 58,88 Q 50,85 30,70 Q 15,50 0,40 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="0.8"
              />
              {/* Western Ghats subtle hill shading */}
              <path
                d="M 5,5 Q 35,25 25,45 Q 10,40 5,20 Z"
                fill="#334155"
                opacity="0.3"
              />
              {/* National Highway NH44 & NH66 artery lines */}
              <path
                d="M 30,35 Q 40,50 45,62 Q 52,70 58,78"
                fill="none"
                stroke="#087F8C"
                strokeWidth="1.2"
                strokeDasharray="2,2"
                opacity="0.7"
              />
            </svg>

            {/* Geographical Markers */}
            <div className="absolute top-2 left-3 text-[10px] font-bold text-slate-400">
              Kanyakumari Dist.
            </div>
            <div className="absolute bottom-2 right-3 text-[9px] font-semibold text-teal-400/80">
              Triveni Sangamam (Cape)
            </div>
            <div className="absolute bottom-2 left-3 text-[9px] font-semibold text-slate-500">
              Arabian Sea
            </div>
            <div className="absolute top-10 right-3 text-[9px] font-semibold text-slate-500">
              Bay of Bengal
            </div>

            {/* Interactive Facility Pins */}
            {facilities.map((fac) => {
              const isSelected = highlightedFacilityId === fac.id;
              return (
                <button
                  key={fac.id}
                  onClick={() => handlePinClick(fac)}
                  style={{ left: `${fac.mapCoords.x}%`, top: `${fac.mapCoords.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all ${
                    isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-115'
                  }`}
                  title={`${fac.name} (${fac.type})`}
                >
                  <div className={`relative flex items-center justify-center rounded-full transition-all ${
                    isSelected 
                      ? 'w-7 h-7 bg-amber-400 text-slate-900 ring-4 ring-amber-400/30' 
                      : fac.type === 'District Hospital'
                        ? 'w-6 h-6 bg-blue-500 text-white ring-2 ring-white'
                        : fac.type === 'Rural Hospital'
                          ? 'w-5 h-5 bg-[#087F8C] text-white ring-2 ring-white'
                          : 'w-4 h-4 bg-emerald-500 text-white ring-1 ring-white'
                  }`}>
                    <Building2 className="w-3 h-3" />
                  </div>
                  {/* Pin label tooltip */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-950/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none border border-slate-700">
                    {fac.name} • {fac.distanceKm} km
                  </span>
                </button>
              );
            })}
          </div>

          {/* Map legend */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-gray-600 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>District Hospital</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#087F8C]" />
              <span>Rural Hospital</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Primary Health Centre</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-300" />
              <span>Sub-Centre / Mandir</span>
            </div>
          </div>
        </div>

        {/* Facility Cards List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Showing {filteredFacilities.length} facilities</span>
            <span>Sorted by proximity</span>
          </div>

          {filteredFacilities.length === 0 ? (
            <div className="p-8 bg-white rounded-3xl border border-gray-200 text-center space-y-2">
              <Building2 className="w-10 h-10 text-gray-300 mx-auto" />
              <div className="font-bold text-gray-700 text-sm">No facilities match your filters</div>
              <p className="text-xs text-gray-500">Try clearing one or more filters above.</p>
            </div>
          ) : (
            filteredFacilities.map((facility) => {
              const isHighlighted = highlightedFacilityId === facility.id;
              return (
                <div
                  key={facility.id}
                  id={`facility-card-${facility.id}`}
                  className={`bg-white rounded-3xl border p-5 sm:p-6 transition-all space-y-4 ${
                    isHighlighted
                      ? 'border-[#087F8C] ring-2 ring-teal-100 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 shadow-xs'
                  }`}
                >
                  {/* Top Header of Card */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          facility.type === 'District Hospital'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : facility.type === 'Rural Hospital'
                              ? 'bg-teal-100 text-[#075E67] border border-teal-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {facility.type}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-[#087F8C]" />
                          {facility.distanceKm} km
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                        {language === 'ta' ? facility.nameTa : facility.name}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{facility.address}</span>
                      </p>
                    </div>

                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start">
                      {facility.openStatus}
                    </span>
                  </div>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {facility.services.slice(0, 4).map((svc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-[11px] font-medium text-gray-700"
                      >
                        {svc}
                      </span>
                    ))}
                    {facility.services.length > 4 && (
                      <span className="px-2 py-1 rounded-lg bg-gray-50 text-[11px] text-gray-500 font-medium">
                        +{facility.services.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Live OPD Queue Peek */}
                  <div className="p-3 bg-[#E8F7F5] rounded-2xl border border-teal-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                      <span className="text-[#075E67] font-semibold">
                        Token: <strong>{facility.currentQueue.token}</strong> (Serving: <strong>{facility.currentQueue.nowServing}</strong>)
                      </span>
                    </div>
                    <span className="text-gray-600 font-medium">
                      ~{facility.currentQueue.estimatedWaitMins} min wait
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                    <button
                      onClick={() => handleOpenDetails(facility)}
                      className="px-4 py-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.viewDetails}</span>
                    </button>

                    <button
                      onClick={() => onBookAppointment(facility)}
                      className="px-4 py-2 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t.bookAppointment}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Facility Details Modal */}
      <FacilityDetailsModal
        facility={selectedFacility}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        language={language}
        onBookAppointment={(fac) => {
          setIsDetailsModalOpen(false);
          onBookAppointment(fac);
        }}
      />
    </div>
  );
};
