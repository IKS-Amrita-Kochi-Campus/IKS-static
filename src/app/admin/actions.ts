"use server";

import fs from 'fs';
import path from 'path';

// Define the shape of our events
export interface IksEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  photoUrl: string;
}

const dataFilePath = path.join(process.cwd(), 'data', 'events.json');

// Ensure data file exists
function ensureFileExists() {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]), 'utf-8');
  }
}

export async function getEvents(): Promise<IksEvent[]> {
  ensureFileExists();
  const fileData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileData);
}

export async function addEvent(formData: FormData) {
  const name = formData.get('name') as string;
  const date = formData.get('date') as string;
  const description = formData.get('description') as string;
  const photo = formData.get('photo') as File;

  let photoUrl = '';

  if (photo && photo.size > 0) {
    // Generate a unique file name
    const ext = photo.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    
    // Create the upload directory in the public folder
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write file
    const filePath = path.join(uploadDir, fileName);
    const arrayBuffer = await photo.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
    
    photoUrl = `/uploads/${fileName}`;
  }

  const newEvent: IksEvent = {
    id: Date.now().toString(),
    name,
    date,
    description,
    photoUrl,
  };

  ensureFileExists();
  const events = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  events.push(newEvent);
  fs.writeFileSync(dataFilePath, JSON.stringify(events, null, 2), 'utf-8');

  return { success: true, event: newEvent };
}
