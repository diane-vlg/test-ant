from docling.document_converter import DocumentConverter

class PDFExtractionService:
    def __init__(self):
        self.converter = DocumentConverter()

    def extract_text(self, file_path: str) -> str:
        """
        Extracts text from a PDF file using Docling.
        """
        try:
            result = self.converter.convert(file_path)
            # Export to markdown is usually a good robust format for LLMs
            return result.document.export_to_markdown()
        except Exception as e:
            print(f"Error extracting text with Docling: {e}")
            raise e
