export const COLORS = ['#c084fc', '#2dd4bf', '#fbbf24', '#f43f5e', '#818cf8', '#34d399', '#f87171', '#60a5fa'];

const rawCsv = `Respondent ID,Gender,Year of Study,Stream/Course,Procrastination Frequency,Task Procrastinated Most,Task Start Timing,Time of Day,Reasons for Delay,Main Distraction,Affects Grades,Feeling After,Ever Missed Submission,Self Identified Procrastinator,Tried to Fix
R001,Female,2nd Year,CSE,Often,All of the above,Starts early but delays,Afternoon,"Too difficult, Distractions",Phone/Social media,Yes,Guilty,No,Sometimes,"Yes, but failed"
R002,Male,2nd Year,ECE,Always,All of the above,Day before,Night,"Too boring, Distractions",Friends,Yes,Stressed,Yes,Yes,Never tried
R003,Female,2nd Year,CSE,Often,Reading,Day before,Evening,Distractions,Phone/Social media,Yes,Guilty,Yes,Yes,"Yes, but failed"
R004,Female,2nd Year,CSE,Often,All of the above,Day before,Morning,"Lack of motivation, Distractions",Phone/Social media,Sometimes,Guilty,No,Sometimes,"Yes, but failed"
R005,Female,2nd Year,B.Sc,Sometimes,Reading,Starts early but delays,Morning,"Lack of motivation, Distractions",Sleep,Maybe,Guilty,No,Sometimes,"Yes, successfully"
R006,Male,2nd Year,BCA,Rarely,Studying for exams,2-3 days before,Evening,"Lack of motivation, Distractions",Phone/Social media,No,Guilty,Yes,Sometimes,"Yes, but failed"
R007,Female,2nd Year,CSE,Sometimes,All of the above,Day before,Afternoon,"Too boring, Distractions",Sleep,Yes,Guilty,Yes,Yes,"Yes, but failed"
R008,Male,2nd Year,CSE,Always,All of the above,Day before,Morning,No deadline pressure,Phone/Social media,Maybe,Guilty,No,Sometimes,"Yes, but failed"
R009,Female,2nd Year,CSE,Often,Studying for exams,2-3 days before,Morning,"Too difficult, Distractions",Phone/Social media,Sometimes,Stressed,No,Sometimes,"Yes, successfully"
R010,Female,2nd Year,CSE,Often,All of the above,Day before,Afternoon,"Distractions, No deadline pressure",Phone/Social media,Yes,Guilty,No,Yes,"Yes, but failed"
R011,Female,3rd Year,B.Com,Sometimes,Reading,2-3 days before,Evening,"Too boring, No deadline pressure",Phone/Social media,Maybe,Motivated by last-minute pressure,No,No,"Yes, successfully"
R012,Female,3rd Year,ECE,Sometimes,Reading,2-3 days before,Evening,"Distractions, Anxiety",Phone/Social media,Sometimes,Guilty,No,Sometimes,"Yes, successfully"
R013,Female,2nd Year,Biotechnology,Sometimes,Studying for exams,2-3 days before,Evening,"Lack of motivation, Too boring",Sleep,Maybe,Motivated by last-minute pressure,No,Sometimes,"Yes, but failed"
R014,Male,1st Year,B.Com,Rarely,Studying for exams,Well in advance,Night,"Too boring, Distractions, No deadline pressure",Phone/Social media,Sometimes,Motivated by last-minute pressure,No,Sometimes,"Yes, successfully"
R015,Female,2nd Year,CSE,Often,All of the above,Day before,Night,"Lack of motivation, Too boring, Distractions",Phone/Social media,Sometimes,Guilty,No,Yes,"Yes, but failed"
R016,Female,2nd Year,CSE,Often,All of the above,Starts early but delays,Morning,"Lack of motivation, Too difficult, Too boring",Phone/Social media,Yes,Guilty,No,Sometimes,"Yes, but failed"
R017,Female,1st Year,CSE,Sometimes,All of the above,2-3 days before,Night,"Lack of motivation, Anxiety",Phone/Social media,Yes,Stressed,No,Yes,"Yes, successfully"
R018,Female,2nd Year,CSE,Often,All of the above,Day before,Night,"No deadline pressure, Distractions",Phone/Social media,Yes,Motivated by last-minute pressure,Yes,Yes,"Yes, successfully"
R019,Female,3rd Year,B.Sc,Often,Reading,Starts early but delays,Afternoon,"Anxiety, Too boring",Sleep,Sometimes,Motivated by last-minute pressure,No,Sometimes,"Yes, successfully"
R020,Male,2nd Year,CSE,Sometimes,Assignments,Day before,Evening,"Too boring, Too difficult",Phone/Social media,Yes,Guilty,No,Sometimes,"Yes, but failed"
R021,Male,3rd Year,CSE,Often,All of the above,2-3 days before,Evening,"No deadline pressure, Too boring",Sleep,Maybe,Stressed,Yes,Yes,"Yes, but failed"
R022,Male,4th Year,B.Sc,Sometimes,All of the above,Day before,Night,"Distractions, Too difficult",Phone/Social media,Yes,Guilty,Yes,Sometimes,Never tried
R023,Male,2nd Year,MBA,Often,Assignments,Day before,Morning,"No deadline pressure, Too difficult",Sleep,Sometimes,Stressed,No,Sometimes,"Yes, but failed"
R024,Female,4th Year,CSE,Often,All of the above,2-3 days before,Afternoon,"No deadline pressure, Too boring",Phone/Social media,Sometimes,Guilty,No,Sometimes,"Yes, but failed"
R025,Female,1st Year,MBA,Always,Studying for exams,2-3 days before,Evening,"Too difficult, Too boring",Sleep,Sometimes,Unbothered,No,Yes,"Yes, but failed"
R026,Male,4th Year,B.Sc,Always,Studying for exams,Day before,Night,"Lack of motivation, No deadline pressure",Sleep,Maybe,Motivated by last-minute pressure,No,Yes,"Yes, but failed"
R027,Female,1st Year,B.Com,Often,All of the above,Starts early but delays,Night,"No deadline pressure, Too difficult",Sleep,Yes,Guilty,No,Sometimes,"Yes, but failed"
R028,Male,1st Year,CSE,Often,Reading,Day before,Evening,"Lack of motivation, Too difficult",Phone/Social media,Yes,Guilty,No,Yes,"Yes, but failed"
R029,Female,3rd Year,B.Sc,Often,Studying for exams,2-3 days before,Afternoon,"Lack of motivation, No deadline pressure",Gaming,Yes,Guilty,No,Yes,"Yes, but failed"
R030,Female,1st Year,BE,Always,Assignments,Day before,Evening,"Too difficult, Distractions",Phone/Social media,Sometimes,Motivated by last-minute pressure,Yes,Sometimes,Never tried
R031,Male,3rd Year,B.Com,Never,Assignments,Well in advance,Afternoon,"Distractions, No deadline pressure",Phone/Social media,Maybe,Motivated by last-minute pressure,Yes,Yes,"Yes, but failed"
R032,Female,3rd Year,CSE,Often,All of the above,Well in advance,Evening,"Distractions, Too difficult",Phone/Social media,Yes,Stressed,No,Yes,"Yes, but failed"
R033,Male,2nd Year,MBA,Often,Assignments,2-3 days before,Night,"Lack of motivation, Anxiety",Phone/Social media,Maybe,Guilty,No,Sometimes,"Yes, but failed"
R034,Male,1st Year,Biotechnology,Often,Studying for exams,Day before,Evening,"Too boring, Too difficult",Phone/Social media,Yes,Guilty,No,Sometimes,Never tried
R035,Male,3rd Year,B.Com,Rarely,Reading,2-3 days before,Morning,"Too boring, Lack of motivation",Friends,Yes,Stressed,No,Sometimes,"Yes, but failed"
R036,Female,3rd Year,CSE,Always,Studying for exams,2-3 days before,Night,"Too difficult, Too boring",Phone/Social media,Yes,Guilty,Yes,Sometimes,"Yes, but failed"
R037,Male,3rd Year,CSE,Often,All of the above,Well in advance,Morning,"Distractions, Too boring",Phone/Social media,Yes,Stressed,No,Yes,"Yes, but failed"
R038,Female,2nd Year,CSE,Always,All of the above,Day before,Morning,"Too boring, Anxiety",Phone/Social media,Sometimes,Stressed,No,Sometimes,Never tried
R039,Male,2nd Year,Biotechnology,Often,Projects,2-3 days before,Night,"Anxiety, Too difficult",Friends,Yes,Stressed,No,Yes,"Yes, but failed"
R040,Male,4th Year,BE,Often,All of the above,2-3 days before,Afternoon,"Too difficult, Lack of motivation",Phone/Social media,Yes,Guilty,Yes,Sometimes,"Yes, but failed"
R041,Female,4th Year,CSE,Often,Projects,Day before,Morning,"Too boring, No deadline pressure",Gaming,Yes,Motivated by last-minute pressure,No,Sometimes,"Yes, successfully"
R042,Female,1st Year,MBA,Sometimes,Assignments,Day before,Evening,"Too boring, Distractions",Gaming,Sometimes,Guilty,No,Yes,"Yes, but failed"
R043,Male,4th Year,B.Com,Often,All of the above,2-3 days before,Afternoon,"Lack of motivation, Too boring",Gaming,Sometimes,Stressed,No,No,"Yes, but failed"
R044,Male,3rd Year,B.Com,Sometimes,All of the above,Day before,Evening,"Too difficult, Anxiety",Phone/Social media,Sometimes,Motivated by last-minute pressure,Yes,Yes,Never tried
R045,Female,2nd Year,BCA,Often,Reading,Well in advance,Night,"No deadline pressure, Too difficult",Gaming,Yes,Guilty,No,Yes,Never tried
R046,Male,2nd Year,B.Sc,Sometimes,Assignments,Starts early but delays,Evening,"Lack of motivation, Distractions",Phone/Social media,Sometimes,Stressed,No,No,"Yes, but failed"
R047,Female,1st Year,BE,Always,Assignments,Day before,Morning,"No deadline pressure, Anxiety",Phone/Social media,Sometimes,Motivated by last-minute pressure,Yes,Yes,"Yes, but failed"
R048,Female,2nd Year,ECE,Always,Projects,Well in advance,Night,"Distractions, Anxiety",Phone/Social media,Yes,Motivated by last-minute pressure,No,Sometimes,Never tried
R049,Male,3rd Year,BCA,Sometimes,Projects,2-3 days before,Afternoon,"Too boring, No deadline pressure",Friends,Yes,Stressed,No,Yes,"Yes, but failed"
R050,Male,2nd Year,BCA,Rarely,All of the above,Day before,Night,"No deadline pressure, Lack of motivation",Friends,Maybe,Guilty,Yes,Yes,Never tried`;

function parseCSV(text: string) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(',');
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    let inQuotes = false;
    let start = 0;
    const parts = [];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '"') inQuotes = !inQuotes;
      if (line[j] === ',' && !inQuotes) {
        parts.push(line.slice(start, j).replace(/^"|"$/g, '').trim());
        start = j + 1;
      }
    }
    parts.push(line.slice(start).replace(/^"|"$/g, '').trim());
    const obj: any = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = parts[idx];
    });
    result.push(obj);
  }
  return result;
}

export const surveyData = parseCSV(rawCsv);

export const overviewStats = {
  total: surveyData.length,
  chronic: Math.round((surveyData.filter(d => d['Procrastination Frequency'] === 'Always' || d['Procrastination Frequency'] === 'Often').length / surveyData.length) * 100) || 0,
  missed: Math.round((surveyData.filter(d => d['Ever Missed Submission'] === 'Yes').length / surveyData.length) * 100) || 0,
};

const countFreq = (key: string) => {
  const map: Record<string, number> = {};
  surveyData.forEach(d => {
    const val = d[key];
    if (val) map[val] = (map[val] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
};

export const frequencyData = countFreq('Procrastination Frequency');
export const taskData = countFreq('Task Procrastinated Most');
export const timingData = countFreq('Task Start Timing');
export const distractionData = countFreq('Main Distraction');
export const fixData = countFreq('Tried to Fix');

export const timeOfDayData = Object.entries(surveyData.reduce((acc: any, d) => {
  acc[d['Time of Day']] = (acc[d['Time of Day']] || 0) + 1;
  return acc;
}, {})).map(([subject, A]) => ({ subject, A: A as number, fullMark: 20 }));

export const reasonsData = (() => {
  const map: Record<string, number> = {};
  surveyData.forEach(d => {
    const reasons = d['Reasons for Delay']?.split(',') || [];
    reasons.forEach((r: string) => {
      const clean = r.trim();
      if (clean) map[clean] = (map[clean] || 0) + 1;
    });
  });
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
})();

export const NEON_COLORS = [
  '#00f3ff', // glowing cyan
  '#ff00ff', // deep magenta
  '#ff4a4a', // warning coral
  '#00ff66', // neon green
  '#ffeb3b', // electric yellow
  '#b100ff', // toxic purple
];

export const feelingImpactData = (() => {
  const feelings = Array.from(new Set(surveyData.map(d => d['Feeling After']).filter(Boolean)));
  return feelings.map(f => {
    const group = surveyData.filter(d => d['Feeling After'] === f);
    return {
      name: f,
      Yes: group.filter(d => d['Affects Grades'] === 'Yes').length,
      No: group.filter(d => d['Affects Grades'] === 'No').length,
      Sometimes: group.filter(d => d['Affects Grades'] === 'Sometimes' || d['Affects Grades'] === 'Maybe').length,
    };
  });
})();

export const sankeyData = (() => {
  const nodesMap = new Map<string, number>();
  const linksMap = new Map<string, number>();

  surveyData.forEach(d => {
    const timing = d['Task Start Timing'];
    const feeling = d['Feeling After'];
    if (!timing || !feeling) return;

    const sourceId = `Start: ${timing}`;
    const targetId = `Feeling: ${feeling}`;

    if (!nodesMap.has(sourceId)) nodesMap.set(sourceId, nodesMap.size);
    if (!nodesMap.has(targetId)) nodesMap.set(targetId, nodesMap.size);

    const linkKey = `${sourceId}|${targetId}`;
    linksMap.set(linkKey, (linksMap.get(linkKey) || 0) + 1);
  });

  const nodes = Array.from(nodesMap.keys()).map(name => ({ name }));
  const links = Array.from(linksMap.entries()).map(([key, value]) => {
    const [s, t] = key.split('|');
    const sourceNode = nodesMap.get(s);
    const targetNode = nodesMap.get(t);
    return {
      source: sourceNode !== undefined ? sourceNode : 0,
      target: targetNode !== undefined ? targetNode : 0,
      value,
    };
  });

  return { nodes, links };
})();

export const frequencyOrder = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];

export const frequencyOrderedData = frequencyOrder.map(f => {
  return { name: f, value: surveyData.filter(d => d['Procrastination Frequency'] === f).length };
});

export const demographicsData = (() => {
  const map: any = {};
  surveyData.forEach(d => {
    const year = d['Year of Study'];
    const course = d['Stream/Course'];
    if (!year || !course) return;
    if (!map[year]) map[year] = {};
    if (!map[year][course]) map[year][course] = 0;
    map[year][course]++;
  });
  
  return Object.entries(map).map(([year, courses]: any) => {
    return {
      name: year,
      children: Object.entries(courses).map(([course, count]) => ({
        name: course,
        size: count
      }))
    };
  });
})();

export const timingVsTimeData = (() => {
  const map: any = {};
  surveyData.forEach(d => {
    const timeOfDay = d['Time of Day'];
    const startTiming = d['Task Start Timing'];
    if (!timeOfDay || !startTiming) return;
    if (!map[timeOfDay]) map[timeOfDay] = { name: timeOfDay };
    if (!map[timeOfDay][startTiming]) map[timeOfDay][startTiming] = 0;
    map[timeOfDay][startTiming]++;
  });
  return Object.values(map);
})();

export const freqVsGradesData = (() => {
  return frequencyOrder.map(freq => {
    const group = surveyData.filter(d => d['Procrastination Frequency'] === freq);
    return {
      name: freq,
      Yes: group.filter(d => d['Affects Grades'] === 'Yes').length,
      No: group.filter(d => d['Affects Grades'] === 'No').length,
      Sometimes: group.filter(d => d['Affects Grades'] === 'Sometimes' || d['Affects Grades'] === 'Maybe').length,
    };
  });
})();

export const missedSubmissionData = (() => {
  const map = { Yes: 0, No: 0 };
  surveyData.forEach(d => {
    const val = d['Ever Missed Submission'];
    if (val === 'Yes' || val === 'No') map[val]++;
  });
  return [
    { name: 'Yes', value: map.Yes },
    { name: 'No', value: map.No }
  ];
})();

export const taskVsFreqData = (() => {
  const map: any = {};
  surveyData.forEach(d => {
    const task = d['Task Procrastinated Most'];
    const freq = d['Procrastination Frequency'];
    if (!task || !freq) return;
    if (!map[task]) map[task] = { name: task };
    if (!map[task][freq]) map[task][freq] = 0;
    map[task][freq]++;
  });
  return Object.values(map);
})();

export const selfIdVsFixData = (() => {
  const ids = ['Yes', 'Sometimes', 'No'];
  return ids.map(id => {
    const group = surveyData.filter(d => d['Self Identified Procrastinator'] === id);
    return {
      name: id,
      'Successful': group.filter(d => d['Tried to Fix']?.includes('successfully')).length,
      'Failed': group.filter(d => d['Tried to Fix']?.includes('failed')).length,
      'Never Tried': group.filter(d => d['Tried to Fix']?.includes('Never')).length,
    }
  });
})();

export const feelingByYearData = (() => {
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  return years.map(y => {
    const group = surveyData.filter(d => d['Year of Study'] === y);
    return {
      name: y,
      Guilty: group.filter(d => d['Feeling After'] === 'Guilty').length,
      Stressed: group.filter(d => d['Feeling After'] === 'Stressed').length,
      Motivated: group.filter(d => d['Feeling After'] === 'Motivated by last-minute pressure').length,
      Unbothered: group.filter(d => d['Feeling After'] === 'Unbothered').length,
    }
  });
})();

export const genderData = (() => {
  const map: any = {};
  let total = 0;
  surveyData.forEach(d => {
    const gender = d['Gender'];
    if (!gender) return;
    map[gender] = (map[gender] || 0) + 1;
    total++;
  });
  return [{ name: 'Ratio', total, ...map }];
})();

export const courseOverviewData = (() => {
  const map: any = {};
  surveyData.forEach(d => {
    const course = d['Stream/Course'];
    if (!course) return;
    map[course] = (map[course] || 0) + 1;
  });
  return Object.entries(map).map(([course, count]) => ({
    name: course,
    size: count
  }));
})();

