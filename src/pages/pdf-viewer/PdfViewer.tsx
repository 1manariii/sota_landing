import { useParams, useNavigate } from 'react-router';

// Импортируем PDF файлы. Vite заменит эти импорты на правильные URL-адреса при сборке.
// Убедитесь, что пути относительны от PdfViewer.tsx
import file1 from '../../shared/assets/pdf/Consent_to_the_processing_of_personal_data.pdf';
import file2 from '../../shared/assets/pdf/License-agreement.pdf';
import file3 from '../../shared/assets/pdf/Privacy_policy.pdf';
import file4 from '../../shared/assets/pdf/Public_Offer_Rental_Equipment_Agreemen.pdf';

// Создаем карту файлов для удобного доступа по ID
const pdfMap: Record<string, string> = {
    'consent': file1,
    'license': file2,
    'privacy': file3,
    'offer': file4,
};

const PdfViewer = () => {
    const navigate = useNavigate();
    const { fileId } = useParams();

    // Получаем путь к файлу из карты
    const pdfUrl = fileId ? pdfMap[fileId] : null;

    if (!pdfUrl) {
        return <div style={{ padding: '20px' }}>Файл не найден</div>;
    }

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <button style={{
                position: 'fixed',
                left: '12px',
                top: '12px', 
                background: '#e65c00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.3rem',
                borderRadius: '8px'
            }} onClick={()=>{
                navigate(-1)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Arrow-back SVG Icon</title><path fill="currentColor" d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z" /></svg>
            </button>
            <iframe
                src={pdfUrl}
                width="100%"
                height="100%"
                title="PDF Viewer"
                style={{ border: 'none' }}
            />
        </div>
    );
};

export default PdfViewer;