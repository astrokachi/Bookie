import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("api/cars", () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: "Toyota Camry" },
        { id: 2, name: "Honda Accord" },
        { id: 3, name: "Nissan Altima" },
        { id: 4, name: "Hyundai Elantra" },
        { id: 5, name: "Ford Fusion" },
        { id: 6, name: "Chevrolet Malibu" },
        { id: 7, name: "Kia Optima" },
        { id: 8, name: "Volkswagen Passat" },
        { id: 9, name: "Subaru Legacy" },
        { id: 10, name: "Mazda 6" },
        { id: 11, name: "Tesla Model 3" },
        { id: 12, name: "BMW 3 Series" },
        { id: 13, name: "Mercedes-Benz C-Class" },
        { id: 14, name: "Audi A4" },
        { id: 15, name: "Lexus ES" },
      ],
    });
  }),

  http.get("/api/services", () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: "Oil Change" },
        { id: 2, name: "Tire Rotation" },
        { id: 3, name: "Brake Inspection" },
        { id: 4, name: "Battery Replacement" },
        { id: 5, name: "Engine Diagnostics" },
        { id: 6, name: "Transmission Repair" },
        { id: 7, name: "Wheel Alignment" },
        { id: 8, name: "AC Service" },
        { id: 9, name: "Suspension Repair" },
        { id: 10, name: "Spark Plug Replacement" },
        { id: 11, name: "Coolant Flush" },
        { id: 12, name: "Fuel System Cleaning" },
        { id: 13, name: "Headlight Replacement" },
        { id: 14, name: "Windshield Wiper Replacement" },
        { id: 15, name: "Timing Belt Replacement" },
      ],
    });
  }),
  http.get("/api/stations", async () => {
    await delay(1000);
    return HttpResponse.json({
      data: [
        {
          id: 1,
          name: "Lagos Central Station",
          location: {
            address: "12 Adeola Odeku St",
            city: "Victoria Island",
            state: "Lagos",
          },
          servicesOffered: [
            "Oil Change",
            "Tire Rotation",
            "Brake Inspection",
            "AC Repair",
          ],
          bookings: [
            {
              bookingId: "BKG-001",
              customerName: "Tunde Bamidele",
              vehicleModel: "Toyota Corolla 2015",
              service: "Brake Inspection",
              bookingTime: "2025-05-23T10:00:00Z",
              status: "confirmed",
            },
          ],
        },
        {
          id: 2,
          name: "Abuja Repair Hub",
          location: {
            address: "Plot 8 Ahmadu Bello Way",
            city: "Wuse",
            state: "FCT",
          },
          servicesOffered: [
            "Diagnostics",
            "Battery Replacement",
            "Suspension Repair",
          ],
          bookings: [],
        },
        {
          id: 3,
          name: "Port Harcourt AutoFix",
          location: {
            address: "21 Trans Amadi Road",
            city: "Port Harcourt",
            state: "Rivers",
          },
          servicesOffered: [
            "Wheel Alignment",
            "Engine Tuning",
            "Tire Replacement",
          ],
          bookings: [],
        },
        {
          id: 4,
          name: "Ibadan Service Bay",
          location: {
            address: "Opp. UI Main Gate",
            city: "Ibadan",
            state: "Oyo",
          },
          servicesOffered: [
            "Oil Change",
            "General Servicing",
            "Transmission Repair",
          ],
          bookings: [
            {
              bookingId: "BKG-004",
              customerName: "Seyi Ogunlade",
              vehicleModel: "Hyundai Elantra 2017",
              service: "General Servicing",
              bookingTime: "2025-05-24T09:00:00Z",
              status: "pending",
            },
          ],
        },
        {
          id: 5,
          name: "Benin City Motor Clinic",
          location: {
            address: "35 Uselu Lagos Rd",
            city: "Benin City",
            state: "Edo",
          },
          servicesOffered: [
            "AC Repair",
            "Brake System Flush",
            "Engine Diagnostics",
          ],
          bookings: [],
        },
        {
          id: 6,
          name: "Kaduna Service Lane",
          location: {
            address: "Abakpa Road",
            city: "Kaduna",
            state: "Kaduna",
          },
          servicesOffered: [
            "Brake Inspection",
            "Battery Replacement",
            "Suspension Repair",
          ],
          bookings: [],
        },
        {
          id: 7,
          name: "Enugu AutoCare Spot",
          location: {
            address: "Zik Avenue",
            city: "Enugu",
            state: "Enugu",
          },
          servicesOffered: ["Tire Balancing", "Oil Change", "Wheel Alignment"],
          bookings: [
            {
              bookingId: "BKG-005",
              customerName: "Chijioke Nnamdi",
              vehicleModel: "Ford Edge 2020",
              service: "Wheel Alignment",
              bookingTime: "2025-05-21T13:00:00Z",
              status: "completed",
            },
          ],
        },
        {
          id: 8,
          name: "Jos Diagnostics Center",
          location: {
            address: "12 Bauchi Rd",
            city: "Jos",
            state: "Plateau",
          },
          servicesOffered: [
            "Engine Diagnostics",
            "AC Repair",
            "Emission Testing",
          ],
          bookings: [],
        },
        {
          id: 9,
          name: "Lekki Quick Fix Station",
          location: {
            address: "Chevron Drive",
            city: "Lekki",
            state: "Lagos",
          },
          servicesOffered: [
            "Battery Testing",
            "Brake Replacement",
            "Oil Change",
          ],
          bookings: [
            {
              bookingId: "BKG-006",
              customerName: "Ifeoma Daniels",
              vehicleModel: "BMW X3 2019",
              service: "Battery Testing",
              bookingTime: "2025-05-25T11:30:00Z",
              status: "confirmed",
            },
          ],
        },
        {
          id: 10,
          name: "Abeokuta Repair Garage",
          location: {
            address: "Oke Mosan Rd",
            city: "Abeokuta",
            state: "Ogun",
          },
          servicesOffered: [
            "Transmission Flush",
            "Suspension Repair",
            "Tire Change",
          ],
          bookings: [],
        },
      ],
    });
  }),
];
