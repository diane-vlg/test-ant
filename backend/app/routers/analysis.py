from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os

router = APIRouter()

@router.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    # Save file temporarily
    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Extract text using Docling
    from app.services.pdf_extraction import PDFExtractionService
    extraction_service = PDFExtractionService() # Optimize: In production, dependency inject or singleton
    try:
        extracted_text = extraction_service.extract_text(temp_file_path)
        # For now, we just print or log it to verify
        print(f"Extracted {len(extracted_text)} characters.")
    except Exception as e:
         raise HTTPException(status_code=500, detail=f"Failed to extract text: {str(e)}")
    finally:
        # Cleanup temp file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

    # Mock Response (using part of extracted text for verification)
    # summary_preview = extracted_text[:200] + "..." if len(extracted_text) > 200 else extracted_text
    
    # Analyze with LLM
    from app.services.llm_service import LLMService
    llm_service = LLMService()
    
    analysis_result = llm_service.analyze_risk(extracted_text)
    
    # Merge filename and status into the result
    return {
        "filename": file.filename,
        "status": "completed",
        **analysis_result
    }
