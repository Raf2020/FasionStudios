import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ImageElement from "@/components/global/image-element";
import { Teacher } from "@/types/teacher.types";
import Image from "next/image";

const teacherSchema = z.object({
  name: z.object({
    en: z.string().min(1, "English name is required"),
    es: z.string().min(1, "Spanish name is required"),
  }),
  profession: z.object({
    en: z.string().min(1, "English profession is required"),
    es: z.string().min(1, "Spanish profession is required"),
  }),
  description: z.object({
    en: z.string().min(1, "English description is required"),
    es: z.string().min(1, "Spanish description is required"),
  }),
  position: z.number({ invalid_type_error: "Position must be a number" }).int().nonnegative(),
  image: z.any().optional(),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

const initialValues: TeacherFormValues = {
  name: { en: "", es: "" },
  profession: { en: "", es: "" },
  description: { en: "", es: "" },
  position: 0,
  image: undefined,
};

const TeacherModal = ({
  onClose,
  onSubmit,
  editingTeacher,
  locale,
  isSaving,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData, isEdit: boolean) => void;
  editingTeacher: Teacher | null;
  locale: string;
  isSaving: boolean;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative overflow-y-auto max-h-screen">
        <h2 className="text-xl font-semibold mb-4">
          {editingTeacher ? "Edit Teacher" : "Create Teacher"}
        </h2>
        <Formik
          initialValues={
            editingTeacher
              ? {
                  name: { en: editingTeacher.name?.en || "", es: editingTeacher.name?.es || "" },
                  profession: { en: editingTeacher.profession?.en || "", es: editingTeacher.profession?.es || "" },
                  description: { en: editingTeacher.description?.en || "", es: editingTeacher.description?.es || "" },
                  position: editingTeacher.position ?? 0,
                  image: undefined,
                }
              : initialValues
          }
          enableReinitialize
          validationSchema={toFormikValidationSchema(teacherSchema)}
          onSubmit={(values) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
              if (typeof value === "object" && value !== null && !(value instanceof File)) {
                Object.entries(value).forEach(([lang, val]) => {
                  formData.append(`${key}.${lang}`, String(val));
                });
              } else if (typeof value === "number") {
                formData.append(key, value.toString());
              } else if (value !== undefined && value !== null) {
                formData.append(key, value as string | Blob);
              }
            });
            onSubmit(formData, Boolean(editingTeacher));
            setImagePreview(null);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-1">
              <label className="block font-semibold">Name (EN)</label>
              <Field name="name.en" placeholder="Name (EN)" className="w-full p-2 border rounded" />
              <ErrorMessage name="name.en" component="div" className="text-red-500 text-sm" />

              <label className="block font-semibold">Name (ES)</label>
              <Field name="name.es" placeholder="Name (ES)" className="w-full p-2 border rounded" />
              <ErrorMessage name="name.es" component="div" className="text-red-500 text-sm" />

              <label className="block font-semibold mt-2">Profession (EN)</label>
              <Field name="profession.en" placeholder="Profession (EN)" className="w-full p-2 border rounded" />
              <ErrorMessage name="profession.en" component="div" className="text-red-500 text-sm" />

              <label className="block font-semibold">Profession (ES)</label>
              <Field name="profession.es" placeholder="Profession (ES)" className="w-full p-2 border rounded" />
              <ErrorMessage name="profession.es" component="div" className="text-red-500 text-sm" />

              <label className="block font-semibold mt-2">Description (EN)</label>
              <Field name="description.en" as="textarea" placeholder="Description (EN)" className="w-full p-2 border rounded" />
              <ErrorMessage name="description.en" component="div" className="text-red-500 text-sm" />

              <label className="block font-semibold mt-2">Description (ES)</label>
              <Field name="description.es" as="textarea" placeholder="Description (ES)" className="w-full p-2 border rounded" />
              <ErrorMessage name="description.es" component="div" className="text-red-500 text-sm" />

              <label className="block font-semibold mt-2">Position</label>
              <Field
                name="position"
                type="number"
                className="w-full p-2 border rounded"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue("position", parseInt(e.target.value))
                }
              />
              <ErrorMessage name="position" component="div" className="text-red-500 text-sm" />

              {(imagePreview || (editingTeacher && editingTeacher.image)) && (
                <div className="mb-2 flex justify-center">
                  {imagePreview ? (
                    <Image
                      height={128}
                      width={128}
                      src={imagePreview}
                      alt="Teacher preview"
                      className="w-32 h-32 object-cover rounded-full border"
                    />
                  ) : (
                    <ImageElement
                      imageUrl={editingTeacher?.image ?? ""}
                      width={128}
                      height={128}
                      alt={editingTeacher?.name?.[locale] || "Teacher Image"}
                      className="w-32 h-32 object-cover rounded-full border"
                      showSkeleton={false}
                    />
                  )}
                </div>
              )}

              <div>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    setFieldValue("image", file);
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    } else {
                      setImagePreview(null);
                    }
                  }}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  disabled={isSaving}
                  className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => { onClose(); setImagePreview(null); }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving && (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  )}
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TeacherModal;
