import type { Competition, Venue } from '@/lib/Structure';
import AdmZip from 'adm-zip';
import type { IZipEntry } from 'adm-zip';
import fs from 'fs';
import path from 'path';
import os from 'os';

const WCIFProcessor = async (wcif: Competition, file: File) =>
{
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const scrambleZipFileName = `${wcif.name} - Computer Display PDFs.zip`;
    const scramblePasscodeFileName = `${wcif.name} - Computer Display PDF Passcodes - SECRET.txt`;

    try 
    {
        const tempFolder = path.join(os.tmpdir(), 'scramble-temp');
        fs.mkdirSync(tempFolder, {recursive: true});

        createFolderFromWCIF(wcif, tempFolder);

        const zip = new AdmZip(buffer);

        const zipEntries = zip.getEntries();
        zipEntries.forEach((entry: IZipEntry) => {
            console.log(entry.entryName);
            console.log(scramblePasscodeFileName);
            console.log(entry.entryName === scramblePasscodeFileName);
            if (entry.entryName === scrambleZipFileName)
            {
                console.log('Found the scramble zip file');

                const scrambleZipBuffer = entry.getData();
                const scrambleZip = new AdmZip(scrambleZipBuffer);
                scrambleZip.extractAllTo(tempFolder, true);

                console.log('Successfully extracted the scramble file');
            }
            else if (entry.entryName === scramblePasscodeFileName)
            {
                console.log('Found the scramble passcode file');

                const passcodeFilePath = path.join(tempFolder, path.basename(entry.entryName));

                fs.writeFileSync(passcodeFilePath, entry.getData());
            }
        });

        console.log('Finalized folder structure:');
        const files = fs.readdirSync(tempFolder).filter(f =>
            fs.statSync(path.join(tempFolder, f)).isFile()
        ).filter(f => !f.endsWith('.zip'));  

        console.log(files);
    }
    catch (err) 
    {
        console.error(err);
    }

    console.log(wcif.name);

    return {};
}

const createFolderFromWCIF = (wcif: Competition, tempFolder: string) =>
{
    const venues: Venue[] = wcif.schedule.venues;

    for (const venue of venues)
    {
        const venuePath = path.join(tempFolder, venue.venueName);

        fs.mkdirSync(venuePath, {recursive: true});

        for (const room of venue.rooms)
        {
            const roomPath = path.join(venuePath, room.roomName);

            fs.mkdirSync(roomPath, {recursive: true});

            for (const activities of room.activities)
            {
                
            }
        }
    }
}

export default WCIFProcessor;