import { notesAPI } from "../services/notesAPI";
import React, { useState, useEffect } from "react";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import { AiFillDelete } from "react-icons/ai";

export default function Notes() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [notes, setNotes] = useState([]);

    const [dataForm, setDataForm] = useState({
        title: "",
        content: "",
        status: ""
    });

    // Fungsi ambil data catatan
    const loadNotes = async () => {
        try {
            const result = await notesAPI.fetchNotes();
            setNotes(result);
        } catch (err) {
            setError("Gagal memuat catatan.");
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await notesAPI.createNote(dataForm);

            setSuccess("Catatan berhasil ditambahkan!");
            setDataForm({ title: "", content: "", status: "" });

            setTimeout(() => setSuccess(""), 3000);
            loadNotes();
        } catch (err) {
            setError('Terjadi kesalahan: ${err.message}');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus catatan ini?");
        if (!konfirmasi) return;

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await notesAPI.deleteNote(id);

            setSuccess("Catatan berhasil dihapus!");
            loadNotes();
        } catch (err) {
            setError('Terjadi kesalahan: ${err.message}');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Notes App</h2>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            {/* Form Tambah Catatan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tambah Catatan Baru</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={dataForm.title}
                        disabled={loading}
                        placeholder="Judul catatan"
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    <textarea
                        name="content"
                        value={dataForm.content}
                        disabled={loading}
                        placeholder="Isi catatan"
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold
                            rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50
                            transition-all shadow"
                    >
                        {loading ? "Mohon Tunggu..." : "Tambah Data"}
                    </button>
                </form>
            </div>

            {/* Tabel Catatan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Daftar Catatan</h3>
                {notes.length === 0 ? (
                    <p className="text-gray-500 text-sm">Belum ada catatan.</p>
                ) : (
                    <GenericTable
                        columns={["#", "Judul", "Isi Catatan", "Aksi"]}
                        data={notes}
                        renderRow={(note, index) => (
                            <>
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{note.title}</td>
                                <td className="px-4 py-2">{note.content}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        disabled={loading}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <AiFillDelete className="text-2xl" />
                                    </button>
                                </td>
                            </>
                        )}
                    />
                )}
            </div>
        </div>
    );
}