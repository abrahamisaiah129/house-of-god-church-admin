"use client";
import React, { useState, useEffect } from "react";
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/lib/api";

export default function ProgrammeManager() {
  // --- 1. STATE MANAGEMENT ---
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    date: "",
    time: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch programmes from API on mount
  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    setLoading(true);
    try {
      const result = await getEvents();
      if (result.success) {
        const programmes = (result.data || []).map((p) => ({
          ...p,
          id: p._id || p.id,
        }));
        setProgrammes(programmes);
      } else {
        setProgrammes([]);
      }
    } catch (error) {
      console.error("Error fetching programmes:", error);
      setProgrammes([]);
    }
    setLoading(false);
  };

  // --- 2. HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine status based on current date
    const eventDate = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();
    const status = eventDate < now ? "past" : "upcoming";

    if (isEditing) {
      // UPDATE EXISTING
      const updatedEvent = { ...formData, status };
      updateEvent(formData.id, updatedEvent)
        .then((result) => {
          if (result.success) {
            setProgrammes(
              programmes.map((prog) =>
                prog.id === formData.id ? { ...prog, ...updatedEvent } : prog,
              ),
            );
            setIsEditing(false);
            resetForm();
          }
        })
        .catch((error) => console.error("Error updating event:", error));
    } else {
      // CREATE NEW
      const newEvent = {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        status,
      };
      createEvent(newEvent)
        .then((result) => {
          if (result.success) {
            setProgrammes([
              { ...newEvent, id: result.data._id },
              ...programmes,
            ]);
            resetForm();
          }
        })
        .catch((error) => console.error("Error creating event:", error));
    }
  };

  const handleEdit = (prog) => {
    setFormData({
      id: prog.id,
      title: prog.title,
      date: prog.date,
      time: prog.time,
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this programme?")) {
      deleteEvent(id)
        .then((result) => {
          if (result.success) {
            setProgrammes(programmes.filter((prog) => prog.id !== id));
            // If deleting the item currently being edited, reset form
            if (isEditing && formData.id === id) {
              resetForm();
            }
          }
        })
        .catch((error) => console.error("Error deleting event:", error));
    }
  };

  const resetForm = () => {
    setFormData({ id: null, title: "", date: "", time: "" });
    setIsEditing(false);
  };

  // Sort: Upcoming/Recent first
  const sortedProgrammes = [...programmes].sort((a, b) => {
    return new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`);
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* --- LEFT COLUMN: INPUT FORM --- */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
          <div className="bg-yellow-50 border-b border-yellow-100 px-6 py-4">
            <h5 className="font-semibold text-yellow-700 flex items-center gap-2">
              {isEditing ? (
                <i className="fas fa-edit"></i>
              ) : (
                <i className="fas fa-calendar-plus"></i>
              )}
              {isEditing ? "Edit Programme" : "Create Programme"}
            </h5>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Thanksgiving Service"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-lg font-bold shadow-sm transition-all transform hover:-translate-y-0.5 ${
                    isEditing
                      ? "bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/30"
                      : "bg-yellow-500 hover:bg-yellow-400 text-black shadow-yellow-500/30"
                  }`}
                >
                  {isEditing ? "Update Programme" : "Add Programme"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: LIST VIEW (CRUD) --- */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h5 className="font-semibold text-gray-800">Programme History</h5>
            <span className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-xs font-medium">
              {sortedProgrammes.length} Items
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {sortedProgrammes.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                  <i className="fas fa-calendar-times text-2xl"></i>
                </div>
                <p className="text-gray-500 font-medium">No programmes found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Add a new event to get started
                </p>
              </div>
            ) : (
              sortedProgrammes.map((prog) => {
                // Determine styling based on if date is past or future
                const isPast =
                  new Date(prog.date) < new Date().setHours(0, 0, 0, 0);

                return (
                  <div
                    key={prog.id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                  >
                    {/* Event Details */}
                    <div className="flex items-start gap-4">
                      {/* Status Icon / Date Box */}
                      <div
                        className={`shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center border shadow-sm ${
                          isPast
                            ? "bg-gray-100 border-gray-200 text-gray-400"
                            : "bg-white border-yellow-100 text-yellow-600"
                        }`}
                      >
                        <span className="text-xl font-bold leading-none">
                          {new Date(prog.date).getDate()}
                        </span>
                        <span className="text-xs uppercase font-semibold mt-1">
                          {new Date(prog.date).toLocaleString("default", {
                            month: "short",
                          })}
                        </span>
                      </div>

                      <div>
                        <h6
                          className={`font-semibold text-lg leading-tight mb-1 ${
                            isPast
                              ? "text-gray-400 line-through decoration-2 decoration-gray-300"
                              : "text-gray-900 group-hover:text-yellow-600 transition-colors"
                          }`}
                        >
                          {prog.title}
                        </h6>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <i className="far fa-clock"></i>
                            {prog.time}
                          </div>
                          {isPast ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                              Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                              Upcoming
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 sm:mt-0 pl-20 sm:pl-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-yellow-700 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-colors"
                        onClick={() => handleEdit(prog)}
                        title="Edit"
                      >
                        <i className="fas fa-pencil-alt text-xs"></i>
                      </button>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                        onClick={() => handleDelete(prog.id)}
                        title="Delete"
                      >
                        <i className="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
