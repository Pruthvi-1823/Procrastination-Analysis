import { useState, useMemo } from 'react';
import { surveyData } from '../data';
import { Search, Database, ArrowUpDown } from 'lucide-react';

export function DataExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string>('Respondent ID');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const headers = [
    'Respondent ID', 'Gender', 'Year of Study', 'Stream/Course', 
    'Procrastination Frequency', 'Task Procrastinated Most', 
    'Main Distraction', 'Affects Grades'
  ];

  const filteredAndSortedData = useMemo(() => {
    let result = [...surveyData];
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((d: any) => 
        Object.values(d).some((v: any) => 
          String(v).toLowerCase().includes(lowerSearch)
        )
      );
    }

    result.sort((a: any, b: any) => {
      const aVal = a[sortKey] || '';
      const bVal = b[sortKey] || '';
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchTerm, sortKey, sortDir, surveyData]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#1A1625] border border-[#2D2640] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-[#B28DFF]" /> Raw Dataset Explorer
            </h2>
            <p className="text-sm text-[#8C83A3] mt-1">Browse, filter, and analyze the 50 responses directly.</p>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C83A3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search dataset..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-[#13111C] border border-[#2D2640] rounded-xl py-2 pl-9 pr-4 text-sm text-[#E2DDF0] focus:outline-none focus:border-[#4B4363] focus:ring-1 focus:ring-[#4B4363] transition-all"
            />
          </div>
        </div>

        <div className="border border-[#2D2640] rounded-xl overflow-x-auto bg-[#13111C]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1A1625] border-b border-[#2D2640]">
                {headers.map(header => (
                  <th 
                    key={header} 
                    onClick={() => handleSort(header)}
                    className="p-4 text-[10px] uppercase tracking-wider text-[#8C83A3] font-bold cursor-pointer hover:text-white transition-colors whitespace-nowrap group"
                  >
                    <div className="flex items-center gap-1">
                      {header}
                      <ArrowUpDown className={`w-3 h-3 transition-opacity ${sortKey === header ? 'opacity-100 text-[#B28DFF]' : 'opacity-0 group-hover:opacity-50'}`} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((row: any, i) => (
                <tr key={i} className="border-b border-[#2D2640]/50 hover:bg-[#1A1625]/50 transition-colors">
                  {headers.map(header => (
                    <td key={header} className="p-4 text-[13px] text-[#E2DDF0] whitespace-nowrap">
                      {header === 'Respondent ID' ? (
                        <span className="font-mono text-[#B28DFF]">{row[header]}</span>
                      ) : header === 'Affects Grades' ? (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          row[header] === 'Yes' ? 'bg-rose-500/20 text-rose-400' :
                          row[header] === 'No' ? 'bg-emerald-500/20 text-emerald-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {row[header]}
                        </span>
                      ) : (
                        row[header]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {filteredAndSortedData.length === 0 && (
                <tr>
                  <td colSpan={headers.length} className="p-8 text-center text-[#8C83A3]">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
