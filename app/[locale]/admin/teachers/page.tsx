"use client";

import React, { useEffect, useState } from "react";
import { Teacher } from "@/types/teacher.types";
import { processTeacherCreation, processTeacherUpdate, processTeacherDeletion } from "@/actions/teacher/teacher.action";
import { getAllTeachers } from "@/actions/teacher/teacher.db";
import { useLocale } from "next-intl";
import toast, { Toaster } from "react-hot-toast";
import TeacherTable from "./components/teacher-table";
import TeacherModal from "./components/teacher-modal";

const AdminTeachersPage = () => {
  const locale = useLocale();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deletingTeacher, setDeletingTeacher] = useState<Teacher | null>(null);

  const fetchTeachers = async () => {
    setIsLoading(true);
    const data = await getAllTeachers();
    setTeachers(data);
    setIsLoading(false);
  };

  useEffect(() => { fetchTeachers(); }, []);

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTeacher) return;
    setIsDeleting(true);
    const result = await processTeacherDeletion(deletingTeacher);
    setIsDeleting(false);
    setDeletingTeacher(null);
    if (result.success) {
      toast.success("Teacher deleted!");
      fetchTeachers();
    } else {
      toast.error("Failed to delete teacher.");
    }
  };

  const handleCreate = () => {
    setEditingTeacher(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  const handleSubmit = async (formData: FormData, isEdit: boolean) => {
    setIsSaving(true);
    let result;
    if (editingTeacher && isEdit) {
      result = await processTeacherUpdate(editingTeacher, formData);
    } else {
      result = await processTeacherCreation(formData);
    }
    setIsSaving(false);
    if (result.success) {
      toast.success(isEdit ? "Teacher updated!" : "Teacher created!");
      await fetchTeachers();
      handleModalClose();
    } else {
      toast.error(result.errorMessage || "Something went wrong.");
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Teachers</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleCreate}
        >
          + Create Teacher
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : (
        <TeacherTable
          teachers={teachers}
          locale={locale}
          onEdit={handleEdit}
          onDelete={(teacher) => setDeletingTeacher(teacher)}
        />
      )}

      {isModalOpen && (
        <TeacherModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          editingTeacher={editingTeacher}
          locale={locale}
          isSaving={isSaving}
        />
      )}

      {deletingTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Delete Teacher</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">&quot;{deletingTeacher.name[locale]}&quot;</span>?{" "}
              This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                disabled={isDeleting}
                className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setDeletingTeacher(null)}
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-70 flex items-center gap-2"
                onClick={handleDeleteConfirm}
              >
                {isDeleting && (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeachersPage;
