import React from "react";
import ImageElement from "@/components/global/image-element";
import { Teacher } from "@/types/teacher.types";

const TeacherTable = ({
  teachers,
  locale,
  onEdit,
  onDelete,
}: {
  teachers: Teacher[];
  locale: string;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
}) => (
  <table className="w-full text-left border border-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 border">Image</th>
        <th className="p-2 border">Name</th>
        <th className="p-2 border">Profession</th>
        <th className="p-2 border">Description</th>
        <th className="p-2 border">Position</th>
        <th className="p-2 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      {teachers.map((teacher) => (
        <tr key={teacher.id} className="border">
          <td className="p-2">
            {teacher.image ? (
              <ImageElement
                height={400}
                width={400}
                imageUrl={teacher.image}
                alt={teacher.name[locale]}
                className="w-14 h-14 object-cover rounded-full"
                showSkeleton={false}
              />
            ) : (
              <span className="text-gray-300 italic">No image</span>
            )}
          </td>
          <td className="p-2 font-medium">{teacher.name[locale]}</td>
          <td className="p-2 text-sm text-gray-500">{teacher.profession[locale]}</td>
          <td className="p-2 text-sm text-gray-600 max-w-xs truncate">
            {teacher.description[locale]}
          </td>
          <td className="p-2 text-center">{teacher.position}</td>
          <td className="p-2 space-x-2">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onEdit(teacher)}
            >
              Edit
            </button>
            <button
              className="text-red-600 hover:underline"
              onClick={() => onDelete(teacher)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      {teachers.length === 0 && (
        <tr>
          <td colSpan={6} className="p-4 text-center text-gray-400">
            No teachers available
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default TeacherTable;
