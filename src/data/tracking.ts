export interface TrackingRow {
  employeeId: string
  name: string
  checkIn: string
  checkOut: string
  location: string
  workingHours: string
}

export const trackingRows: TrackingRow[] = [
  {
    employeeId: "EMP-1042",
    name: "Sarah Jenkins",
    checkIn: "09:02 AM",
    checkOut: "06:14 PM",
    location: "Mumbai HQ",
    workingHours: "9h 12m",
  },
  {
    employeeId: "EMP-1088",
    name: "David Kumar",
    checkIn: "09:10 AM",
    checkOut: "06:05 PM",
    location: "Pune Branch",
    workingHours: "8h 55m",
  },
  {
    employeeId: "EMP-1103",
    name: "Anita Mishra",
    checkIn: "08:58 AM",
    checkOut: "—",
    location: "Remote — Mumbai",
    workingHours: "Active",
  },
  {
    employeeId: "EMP-1127",
    name: "Rajesh Khanna",
    checkIn: "09:21 AM",
    checkOut: "05:58 PM",
    location: "New Delhi HQ",
    workingHours: "8h 37m",
  },
  {
    employeeId: "EMP-1156",
    name: "Vikram Patel",
    checkIn: "09:05 AM",
    checkOut: "—",
    location: "Client Site — Ahmedabad",
    workingHours: "Active",
  },
  {
    employeeId: "EMP-1170",
    name: "Sonia Lamba",
    checkIn: "09:14 AM",
    checkOut: "06:02 PM",
    location: "Kolkata Branch",
    workingHours: "8h 48m",
  },
]

export interface GeoRecord {
  time: string
  location: string
  coords: string
}

export const geoRecords: GeoRecord[] = [
  { time: "09:02 AM", location: "Mumbai HQ — Powai", coords: "19.1176° N, 72.9060° E" },
  { time: "01:15 PM", location: "Client Site — BKC", coords: "19.0662° N, 72.8691° E" },
  { time: "04:40 PM", location: "Mumbai HQ — Powai", coords: "19.1176° N, 72.9060° E" },
]
