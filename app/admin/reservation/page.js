"use client";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, LayoutDashboard, ClipboardCheck, CalendarRange, Menu } from 'lucide-react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import Image from 'next/image';

const Reservation = () => {
  const [reservations, setReservations] = useState([
    { id: 1, roomName: "Meeting Room A", requester: "John Doe", email: "john@example.com", purpose: "Team Sprint Planning", date: "2025-02-24", time: "10:00", duration: "1 hour", attendees: 6, status: "pending", requestedAt: "2025-02-20" },
    { id: 2, roomName: "Conference Room B", requester: "Sarah Smith", email: "sarah@example.com", purpose: "Client Meeting", date: "2025-02-24", time: "14:00", duration: "2 hours", attendees: 8, status: "approved", requestedAt: "2025-02-19" },
    { id: 3, roomName: "Meeting Room C", requester: "Mike Johnson", email: "mike@example.com", purpose: "Training Session", date: "2025-02-25", time: "11:00", duration: "3 hours", attendees: 12, status: "approved", requestedAt: "2025-02-18" }
  ]);

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: false
    },
    {
      title: "Approvals",
      href: "/admin/approval",
      icon: <ClipboardCheck className="h-5 w-5" />,
      active: false
    },
    {
      title: "Reservations",
      href: "/admin/reservation",
      icon: <CalendarRange className="h-5 w-5" />,
      active: true
    }
  ];

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:relative transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="h-full flex flex-col border-r bg-muted/40">
          <div className="flex h-14 items-center px-4 border-b">
            <Image src="/psalogoo.png" alt="Logo" width={32} height={32} className="mr-2" />
            <h2 className={cn("text-xl font-semibold", !sidebarOpen && "hidden")}>Booking System</h2>
          </div>
          <nav className="flex-1 overflow-auto py-2 mt-4 space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-lg transition-colors",
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted hover:text-foreground"
                )}
              >
                {item.icon}
                {sidebarOpen && item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto ml-16 md:ml-0">
        <button
          className="fixed top-4 left-4 z-50 md:relative md:top-0 md:left-0 p-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Reservations</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search reservations..."
                className="pl-8 pr-4 py-2 border rounded-md"
              />
            </div>
            <Button>Filter</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reservation List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map(reservation => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.roomName}</TableCell>
                    <TableCell>{reservation.requester}</TableCell>
                    <TableCell>{reservation.purpose}</TableCell>
                    <TableCell>{reservation.date} {reservation.time}</TableCell>
                    <TableCell>{reservation.duration}</TableCell>
                    <TableCell>{reservation.attendees} people</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          reservation.status === 'approved' 
                            ? 'bg-green-500' 
                            : reservation.status === 'pending' 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                        }
                      >
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reservation;