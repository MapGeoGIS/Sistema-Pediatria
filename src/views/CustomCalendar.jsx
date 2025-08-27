import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es"); 
const localizer = momentLocalizer(moment);

const GoogleCalendarView = ({ user }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log(user);
    
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const data = await res.json();

        if (data.items) {
          const formatted = data.items.map((ev) => ({
            title: ev.summary,
            start: new Date(ev.start.dateTime || ev.start.date),
            end: new Date(ev.end.dateTime || ev.end.date),
          }));
          setEvents(formatted);
        }
      } catch (err) {
        console.error("Error cargando eventos:", err);
      }
    };

    if (user?.accessToken) fetchEvents();
  }, [user]);

  const messages = {
  today: "Hoy",
  previous: "Atrás",
  next: "Siguiente",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  allDay: "Todo el día",
  noEventsInRange: "No hay eventos en este rango.",
  showMore: (total) => `+ Ver más (${total})`,
};

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        messages={messages} // <-- Aquí aplicamos la traducción
      />
    </div>
  );
};

export default GoogleCalendarView;
