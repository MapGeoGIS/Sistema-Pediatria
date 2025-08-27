import { useEffect } from "react";
const GoogleCalendarEmbed = ({ user }) => {
  useEffect(() => {
    console.log(user.email);
  }, [user]);
  return (
    <div className="w-full max-w-5xl mx-auto aspect-[4/3] relative bg-white dark:bg-gray-900 mt-28">
      <iframe
        src={`https://calendar.google.com/calendar/embed?src=${user.email}&ctz=America/Argentina/Buenos_Aires`}
        className="absolute top-0 left-0 w-full rounded-lg shadow-md overflow-y-hidden"
        style={{ border: 0 ,height: "calc(100% - 85px)"}}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default GoogleCalendarEmbed;
