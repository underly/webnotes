import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { Note as NoteModel } from '../models/note';
import * as NotesApi from '../network/notes_api';
import styles from '../styles/NotesPage.module.css';
import styleUtils from '../styles/utils.module.css';
import AddEditNoteDialog from './AddEditNoteDialog';
import Note from './Note';

const NotesPageLoggedInView = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [notesLoading, setNotesLoading] = useState(true);
	const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
	const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

	useEffect(() => {
		const loadNotes = async () => {
			try {
				setShowNotesLoadingError(false);
				setNotesLoading(true);
				const notes = await NotesApi.fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.log(error);
				setShowNotesLoadingError(true);
			} finally {
				setNotesLoading(false);
			}
		};
		loadNotes();
	}, []);

	async function deleteNote(note: NoteModel) {
		try {
			await NotesApi.deleteNote(note._id);
			setNotes(notes.filter((item) => item._id !== note._id));
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}

	const notesGrid = (
		<Row xs={1} md={2} lg={3} className={`g-4 ${styles.noteGrid}`}>
			{notes.map((note) => {
				return (
					<Col key={note._id}>
						<Note
							note={note}
							className={styles.note}
							onNoteClicked={setNoteToEdit}
							onDeleteNoteClicked={deleteNote}
						/>
					</Col>
				);
			})}
		</Row>
	);
	return (
		<>
			<Button
				className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
				variant="outline-dark"
				onClick={() => {
					setShowAddNoteDialog(true);
				}}
			>
				<FaPlus />
				Add New Note
			</Button>
			{notesLoading && <Spinner animation="border" variant="primary" />}
			{showNotesLoadingError && (
				<p>There was an error. Please refresh the page.</p>
			)}
			{!notesLoading && !showNotesLoadingError && (
				<>
					{notes.length > 0 ? (
						notesGrid
					) : (
						<p>You have no saved notes. Add some to view them here!</p>
					)}
				</>
			)}
			{showAddNoteDialog && (
				<AddEditNoteDialog
					onDismiss={() => setShowAddNoteDialog(false)}
					onNoteSaved={(newNote) => {
						setShowAddNoteDialog(false);
						setNotes([...notes, newNote]);
					}}
				/>
			)}
			{noteToEdit && (
				<AddEditNoteDialog
					noteToEdit={noteToEdit}
					onDismiss={() => setNoteToEdit(null)}
					onNoteSaved={(newNote) => {
						setNotes(
							notes.map((note) =>
								note._id === newNote._id ? newNote : note
							)
						);
						setNoteToEdit(null);
					}}
				/>
			)}
		</>
	);
};

export default NotesPageLoggedInView;
