import CreateContactModal from "@/components/CreateContactModal";
import Toast from "@/components/Toast";
import AddressList from "../components/AddressList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-2xl mx-auto flex flex-col items-center gap-2 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 dark:text-white mt-2 mb-1 text-center">
          Agenda de Endereços
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-center max-w-xl">
          Cadastre, edite e gerencie contatos com busca automática de endereço por
          CEP. Os dados ficam salvos no seu navegador.
        </p>
      </header>
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-8 items-center">

        <section className="w-full bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              Contatos cadastrados
            </h2>
            <CreateContactModal />
          </div>
          <AddressList />
        </section>
      </main>
      <footer className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <a
            className="hover:underline"
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
          <a
            className="hover:underline"
            href="https://zustand-demo.pmnd.rs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zustand
          </a>
          <a
            className="hover:underline"
            href="https://github.com/filipedeschamps/cep-promise"
            target="_blank"
            rel="noopener noreferrer"
          >
            cep-promise
          </a>
        </div>
        <div className="mt-2">
          Desafio técnico 2025 &copy; Eai-Pago
        </div>
      </footer>
      <Toast />
    </div>
  );
}
