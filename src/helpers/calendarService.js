export const createBirthdayEvent = async (user, birthday) => {
  const event = {
    summary: `Cumpleaños de ${birthday.nombre} 🎂`,
    start: { date: birthday.fecha }, // YYYY-MM-DD
    end: { date: birthday.fecha },
    recurrence: ["RRULE:FREQ=YEARLY"],
    reminders: {
      useDefault: false,
      overrides: [{ method: "popup", minutes: 60 * 24 }],
    },
  };

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  return await response.json();
};
