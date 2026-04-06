import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ImageElement from "@/components/global/image-element";
import { Class } from "@/types/class.types";
import Image from "next/image";

const classSchema = z.object({
  name: z.object({
    en: z.string().min(1, "English name is required"),
    es: z.string().min(1, "Spanish name is required"),
  }),
  description: z.object({
    en: z.string().min(1, "English description is required"),
    es: z.string().min(1, "Spanish description is required"),
  }),
  position: z.number({ invalid_type_error: "Position must be a number" }).int().nonnegative(),
  image: z.any().optional(),
});

type ClassFormValues = z.infer<typeof classSchema>;

const initialValues: ClassFormValues = {
  name: { en: "", es: "" },
  description: { en: "", es: "" },
  position: 0,
  image: undefined,
};

const ClassModal = ({
  onClose,
  onSubmit,
  editingClass,
  locale,
  isSaving,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData, isEdit: boolean) => void;
  editingClass: Class | null;
  locale: string;
  isSaving: boolean;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative overflow-y-auto max-h-screen">
        <h2 className="text-xl font-semibold mb-4">
          {editingClass ? "Edit Class" : "Create Class"}
        </h2>
        <Formik
          initialValues={
            editingClass
              ? {
                  name: { en: editingClass.name?.en || "", es: editingClass.name?.es || "" },
                  description: { en: editingClass.description?.en || "", es: editingClass.description?.es || "" },
                  position: editingClass.position ?? 0,
                  image: undefined,
                }
              : initialValues
          }
          enableReinitialize
          validationSchema={toFormikValidationSchema(classSchema)}
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
            onSubmit(formData, Boolean(editingClass));
            setImagePreview(null);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-1">
              <label className="block font-semibold">Class Name (EN)</label>
              <Field name="name.en" placeholder="Class Name (EN)" className="w-full p-2 border rounded" />
              <ErrorMessage name="name.en" component="div" className="text-red-500 text-sm" />

              <label className="block font-semibold">Class Name (ES)</label>
              <Field name="name.es" placeholder="Class Name (ES)" className="w-full p-2 border rounded" />
              <ErrorMessage name="name.es" component="div" className="text-red-500 text-sm" />

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

              {(imagePreview || (editingClass && editingClass.image)) && (
                <div className="mb-2 flex justify-center">
                  {imagePreview ? (
                    <Image
                      height={128}
                      width={128}
                      src={imagePreview}
                      alt="Class preview"
                      className="w-32 h-32 object-cover rounded border"
                    />
                  ) : (
                    <ImageElement
                      imageUrl={editingClass?.image ?? ""}
                      width={128}
                      height={128}
                      alt={editingClass?.name?.[locale] || "Class Image"}
                      className="w-32 h-32 object-contain rounded border"
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

export default ClassModal;
