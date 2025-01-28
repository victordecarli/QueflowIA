import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { CheckCircle2, XCircle } from "lucide-react";

interface PaymentStatusDialogProps {
  isOpen: boolean;
  status: 'success' | 'error';
}

export function PaymentStatusDialog({ isOpen, status }: PaymentStatusDialogProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[400px] p-6 bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {status === 'success' ? 'Payment Successful' : 'Payment Failed'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center gap-4">
          {status === 'success' ? (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Pagamento Confirmado!
                </h3>
                <p className="text-gray-600">
                  Bora editar e arrasar nas foto
                </p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-12 h-12 text-red-500" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Falha no pagamento
                </h3>
                <p className="text-gray-600">
                  Algo deu errado com o pagamento. Tente novamente!
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
