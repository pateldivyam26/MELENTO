import { Document, Paragraph, ImageRun, Packer } from "docx";

export class DocumentCreator {
    public create(para1: string, para2: string, imageData: ArrayBuffer): Document {
        const document = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            text: para1
                        }),
                        new Paragraph({
                            text: para2
                        }),
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: imageData,
                                    transformation: {
                                        width: 100,
                                        height: 100,
                                    },
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });
        return document;
    }
}
