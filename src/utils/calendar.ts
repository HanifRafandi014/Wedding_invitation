export function createGoogleCalendarUrl(params: {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}): string {
  const formatTime = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const dates = `${formatTime(params.startDate)}/${formatTime(params.endDate)}`;
  const searchParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: params.title,
    details: params.description,
    location: params.location,
    dates: dates,
  });

  return `https://calendar.google.com/calendar/render?${searchParams.toString()}`;
}

export function downloadIcsFile(params: {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}): void {
  const formatIcsDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Wedding of Hanif & Rina//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${params.title}`,
    `DESCRIPTION:${params.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${params.location}`,
    `DTSTART:${formatIcsDate(params.startDate)}`,
    `DTEND:${formatIcsDate(params.endDate)}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Pengingat Acara Pernikahan Hanif & Rina',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Pernikahan_Hanif_Rina.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
