"use client";

import React, { useEffect, useState } from "react";
import { Class } from "@/types/class.types";
import { processClassCreation, processClassUpdate, processClassDeletion } from "@/actions/class/class.action";
import { getAllClasses } from "@/actions/class/class.db";
import { useLocale } from "next-intl";
import toast, { Toaster } from "react-hot-toast";
import ClassTable from "./components/class-table";
import ClassModal from "./components/class-modal";

const AdminClassesPage = () => {
  const locale = useLocale();
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [deletingClass, setDeletingClass] = useState<Class | null>(null);

  const fetchClasses = async () => {
    setIsLoading(true);
    const data = await getAllClasses();
    setClasses(data);
    setIsLoading(false);
  };

  useEffect(() => { fetchClasses(); }, []);

  const handleEdit = (classData: Class) => {
    setEditingClass(classData);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingClass) return;
    setIsDeleting(true);
    const result = await processClassDeletion(deletingClass);
    setIsDeleting(false);
    setDeletingClass(null);
    if (result.success) {
      toast.success("Class deleted!");
      fetchClasses();
    } else {
      toast.error("Failed to delete class.");
    }
  };

  const handleCreate = () => {
    setEditingClass(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingClass(null);
  };

  const handleSubmit = async (formData: FormData, isEdit: boolean) => {
    setIsSaving(true);
    let result;
    if (editingClass && isEdit) {
      result = await processClassUpdate(editingClass, formData);
    } else {
      result = await processClassCreation(formData);
    }
    setIsSaving(false);
    if (result.success) {
      toast.success(isEdit ? "Class updated!" : "Class created!");
      await fetchClasses();
      handleModalClose();
    } else {
      toast.error(result.errorMessage || "Something went wrong.");
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Classes</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleCreate}
        >
          + Create Class
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
        <ClassTable
          classes={classes}
          locale={locale}
          onEdit={handleEdit}
          onDelete={(classData) => setDeletingClass(classData)}
        />
      )}

      {isModalOpen && (
        <ClassModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          editingClass={editingClass}
          locale={locale}
          isSaving={isSaving}
        />
      )}

      {deletingClass && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Delete Class</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">"{deletingClass.name[locale]}"</span>? This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                disabled={isDeleting}
                className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setDeletingClass(null)}
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

export default AdminClassesPage;
