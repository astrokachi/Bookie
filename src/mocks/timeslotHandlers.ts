import { http, HttpResponse, delay } from "msw";

function generateTimeSlots(stationId: number) {
  const baseDate = new Date("2025-05-22T08:00:00Z");
  const timeSlots = [];

  for (let day = 0; day < 7; day++) {
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + day);

    for (let hour = 8; hour <= 17; hour++) {
      const slotDate = new Date(currentDate);
      slotDate.setHours(hour);

      const isAvailable = Math.random() > 0.3;

      timeSlots.push({
        id: `${stationId}-${day}-${hour}`,
        stationId,
        startTime: slotDate.toISOString(),
        endTime: new Date(slotDate.setHours(hour + 1)).toISOString(),
        available: isAvailable,
      });
    }
  }

  return timeSlots;
}

export const timeslotHandlers = [
  http.get("/api/stations/:stationId/timeslots", async ({ params }) => {
    await delay(800);
    const stationId = Number(params.stationId);

    return HttpResponse.json({
      data: generateTimeSlots(stationId),
    });
  }),

  http.post("/api/bookings", async ({ request }) => {
    await delay(1000);
    const booking = await request.json();

    return HttpResponse.json({
      success: true,
      data: {
        bookingId: `BKG-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        ...(booking as object),
        status: "confirmed",
      },
    });
  }),
];
