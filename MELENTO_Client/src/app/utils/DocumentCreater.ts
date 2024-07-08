import { Document, Paragraph, ImageRun, Packer, Table, TableRow, TableCell, HeadingLevel, TextRun } from "docx";

export class DocumentCreator {
    public create(
        assessmentName: string,
        dateTime: string,
        facultyId: string,
        totalMarks: number,
        imageData: ArrayBuffer,
        questions: { questionText: string; options: string[]; answer: string }[]
    ): Document {
        // Create the header section
        const header = new Paragraph({
            children: [
                new TextRun({ text: assessmentName, bold: true, size: 28 }), // Assessment Name
                new TextRun({ text: `\n${dateTime}`, size: 20 }), // Date and Time
            ],
            spacing: {
                after: 200, // Adds some space after the header
            },
        });

        // Faculty ID and Total Marks section
        const facultyAndMarks = new Paragraph({
            children: [
                new TextRun({ text: `Faculty ID: ${facultyId}`, size: 24 }),
                new TextRun({ text: `\nTotal Marks: ${totalMarks}`, size: 24 }),
            ],
            spacing: {
                after: 200,
            },
        });

        // Assessment Image section
        const imageSection = new Paragraph({
            children: [
                new ImageRun({
                    data: imageData,
                    transformation: {
                        width: 100,
                        height: 100,
                    },
                }),
            ],
            spacing: {
                after: 200,
            },
        });

        // Questions section
        const questionParagraphs = questions.flatMap((question, index) => [
            new Paragraph({
                children: [
                    new TextRun({ text: `Q${index + 1}: ${question.questionText}`, bold: true, size: 24 }),
                ],
                spacing: { after: 200 },
            }),
            ...question.options.map((option, optIndex) =>
                new Paragraph({
                    children: [
                        new TextRun({ text: `${String.fromCharCode(65 + optIndex)}. ${option}`, size: 20 }),
                    ],
                    spacing: { after: 100 },
                })
            ),
            new Paragraph({
                children: [
                    new TextRun({ text: `Correct Answer: ${question.answer}`, bold: true, size: 20 }),
                ],
                spacing: { after: 200 },
            }),
        ]);
        // Combine all sections into a single document
        const document = new Document({
            sections: [
                {
                    children: [
                        header,
                        facultyAndMarks,
                        imageSection,
                        ...questionParagraphs,
                    ],
                },
            ],
        });

        return document;
    }
}
