"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    VideoCarouselSchema,
    VideoCarouselUpdateSchema,
} from "@/actions/video-carousel/video-carousel.schema";
import {
    addVideoItem,
    updateVideoItem,
    deleteVideoItem,
    getAllVideoItems,
} from "@/actions/video-carousel/video-carousel.action";
import { z } from "zod";
import { useEffect } from "react";
import toast from "react-hot-toast";

type FormValues = z.infer<typeof VideoCarouselSchema>;
type UpdateValues = z.infer<typeof VideoCarouselUpdateSchema>;

export default function VideoCarouselPage() {
    const [videoItems, setVideoItems] = useState<UpdateValues[]>([]);
    const [editItem, setEditItem] = useState<UpdateValues | null>(null);
    const [deleteItem, setDeleteItem] = useState<UpdateValues | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const loadData = async () => {
        const result = await getAllVideoItems();
        setVideoItems(result);
    };

    useEffect(() => {
        loadData();
    }, []);

    const form = useForm<FormValues | UpdateValues>({
        resolver: zodResolver(editItem ? VideoCarouselUpdateSchema : VideoCarouselSchema),
        defaultValues: {
            youtubeLink: "",
            isActive: true,
            position: 0,
        },
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        const res = editItem ? await updateVideoItem(data) : await addVideoItem(data);

        if (res.success) {
            toast.success(`Video ${editItem ? "updated" : "added"} successfully.`);
            form.reset();
            setEditItem(null);
            setOpenForm(false);
            await loadData();
        } else {
            toast.error("Failed to save video.");
        }
    });

    const handleDelete = async () => {
        if (!deleteItem) return;
        const res = await deleteVideoItem(deleteItem.id);
        if (res.success) {
            toast.success("Video deleted successfully.");
            setDeleteItem(null);
            setOpenDelete(false);
            await loadData();
        } else {
            toast.error("Failed to delete video.");
        }
    };
    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">Video Carousel Admin</h1>
                <Button onClick={() => { form.reset(); setEditItem(null); setOpenForm(true); }}>
                    + Add Video
                </Button>
            </div>

            {/* Table */}
            <div className="border rounded-md">
                <table className="w-full text-sm">
                    <thead className="bg-muted text-xs uppercase text-muted-foreground">
                    <tr>
                        <th className="p-2 text-left">YouTube Link</th>
                        <th className="p-2">Active</th>
                        <th className="p-2">Position</th>
                        <th className="p-2 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {videoItems.map((item) => (
                        <tr key={item.id} className="border-t">
                            <td className="p-2">{item.youtubeLink}</td>
                            <td className="p-2 text-center">{item.isActive ? "✅" : "❌"}</td>
                            <td className="p-2 text-center">{item.position}</td>
                            <td className="p-2 text-right space-x-2">
                                <Button variant="outline" size="sm" onClick={() => {
                                    form.reset(item);
                                    setEditItem(item);
                                    setOpenForm(true);
                                }}>
                                    Edit
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => {
                                    setDeleteItem(item);
                                    setOpenDelete(true);
                                }}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Form Dialog */}
            <Dialog open={openForm} onOpenChange={setOpenForm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editItem ? "Edit Video" : "Add Video"}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {editItem && (
                            <input type="hidden" {...form.register("id")} />
                        )}

                        <div>
                            <Label>YouTube Link</Label>
                            <Input {...form.register("youtubeLink")} />
                        </div>

                        <div>
                            <Label>Position</Label>
                            <Input type="number" {...form.register("position", { valueAsNumber: true })} />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isActive"
                                checked={form.watch("isActive")}
                                onCheckedChange={(checked) => form.setValue("isActive", !!checked)}
                            />
                            <Label htmlFor="isActive">Active</Label>
                        </div>

                        <DialogFooter>
                            <Button type="submit">{editItem ? "Update" : "Create"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this video?</p>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenDelete(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}