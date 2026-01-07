"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CookiePolicyPage = () => {
  const t = useTranslations("CookieBanner");

  return (
    <div className="w-full px-6 pb-10 sm:px-15 sm:pb-20">
      <div className="w-full pt-28 pb-6 sm:pt-40 sm:pb-10">
        <h1 className="text-black text-2xl sm:text-[52px] sm:leading-[64px] mb-6">
          {t("CookiePolicy")}
        </h1>

        {/* Table of Contents */}
        <nav className="mb-10 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Contenido
          </h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#que-son" className="text-blue-600 hover:underline">1. ¿Qué son las Cookies?</a></li>
            <li><a href="#tipos" className="text-blue-600 hover:underline">2. Tipos de Cookies</a></li>
            <li><a href="#utilizadas" className="text-blue-600 hover:underline">3. Cookies Utilizadas en Esta Web</a></li>
            <li><a href="#gestion" className="text-blue-600 hover:underline">4. Gestión de Cookies</a></li>
            <li><a href="#actualizacion" className="text-blue-600 hover:underline">5. Actualización de la Política de Cookies</a></li>
          </ul>
        </nav>

        <div className="prose max-w-none">
          {/* Introducción */}
          <section className="mb-10">
            <p className="mb-4">
              En cumplimiento con lo dispuesto en el artículo 22.2 de la Ley 34/2002, de 11 de julio, de
              Servicios de la Sociedad de la Información y de Comercio Electrónico, esta página web le
              informa, en esta sección, sobre la política de recogida y tratamiento de cookies.
            </p>
          </section>

          {/* ¿Qué son las Cookies? */}
          <section id="que-son" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              1. ¿Qué son las Cookies?
            </h2>
            <p className="mb-4">
              Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas
              web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar
              información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de
              la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para
              reconocer al usuario.
            </p>
          </section>

          {/* Tipos de Cookies */}
          <section id="tipos" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              2. Tipos de Cookies
            </h2>

            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3">
              Según la entidad que las gestione
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Cookies propias:</strong> Son aquellas que se envían al equipo terminal del usuario desde un
                equipo o dominio gestionado por el propio editor y desde el que se presta el servicio
                solicitado por el usuario.</li>
              <li><strong>Cookies de terceros:</strong> Son aquellas que se envían al equipo terminal del usuario desde un
                equipo o dominio que no es gestionado por el editor, sino por otra entidad que trata los
                datos obtenidos través de las cookies.</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3">
              Según el plazo de tiempo que permanecen activadas
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Cookies de sesión:</strong> Son un tipo de cookies diseñadas para recabar y almacenar datos
                mientras el usuario accede a una página web.</li>
              <li><strong>Cookies persistentes:</strong> Son un tipo de cookies en el que los datos siguen almacenados en
                el terminal y pueden ser accedidos y tratados durante un periodo definido por el
                responsable de la cookie, y que puede ir de unos minutos a varios años.</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3">
              Según su finalidad
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Cookies técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de una
                página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios
                que en ella existan.</li>
              <li><strong>Cookies de personalización:</strong> Son aquellas que permiten al usuario acceder al servicio con
                algunas características de carácter general predefinidas en función de una serie de criterios
                en el terminal del usuario.</li>
              <li><strong>Cookies de análisis:</strong> Son aquellas que permiten al responsable de las mismas, el
                seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que están
                vinculadas.</li>
              <li><strong>Cookies publicitarias:</strong> Son aquellas que permiten la gestión, de la forma más eficaz
                posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página
                web, aplicación o plataforma desde la que presta el servicio solicitado en base a criterios
                como el contenido editado o la frecuencia en la que se muestran los anuncios.</li>
              <li><strong>Cookies de publicidad comportamental:</strong> Son aquellas que permiten la gestión, de la forma
                más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en
                una página web, aplicación o plataforma desde la que presta el servicio solicitado. Estas
                cookies almacenan información del comportamiento de los usuarios obtenida a través de la
                observación continuada de sus hábitos de navegación, lo que permite desarrollar un perfil
                específico para mostrar publicidad en función del mismo.</li>
            </ul>
          </section>

          {/* Cookies Utilizadas */}
          <section id="utilizadas" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              3. Cookies Utilizadas en Esta Web
            </h2>
            <p className="mb-4">
              A continuación se identifican las cookies que están siendo utilizadas en este portal así como su
              tipología y función:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Cookie</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Tipo</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Finalidad</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Cookies de sesión</td>
                    <td className="border border-gray-300 px-4 py-2">Técnica</td>
                    <td className="border border-gray-300 px-4 py-2">Mantener la sesión del usuario</td>
                    <td className="border border-gray-300 px-4 py-2">Sesión</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Cookies de idioma</td>
                    <td className="border border-gray-300 px-4 py-2">Personalización</td>
                    <td className="border border-gray-300 px-4 py-2">Recordar preferencias de idioma</td>
                    <td className="border border-gray-300 px-4 py-2">1 año</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Cookies de consentimiento</td>
                    <td className="border border-gray-300 px-4 py-2">Técnica</td>
                    <td className="border border-gray-300 px-4 py-2">Recordar preferencias de cookies</td>
                    <td className="border border-gray-300 px-4 py-2">1 año</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-4">
              <strong>Nota:</strong> Esta web no utiliza cookies de terceros para publicidad o análisis de
              comportamiento.
            </p>
          </section>

          {/* Gestión de Cookies */}
          <section id="gestion" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              4. Gestión de Cookies
            </h2>
            <p className="mb-4">
              El usuario tiene la opción de permitir, bloquear o eliminar las cookies instaladas en su equipo
              mediante la configuración de las opciones del navegador instalado en su ordenador.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3">
              Configuración de cookies en los navegadores más comunes:
            </h3>

            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Google Chrome:</strong>{" "}
                <a
                  href="https://support.google.com/chrome/answer/95647?hl=es"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Configuración de cookies en Chrome
                </a>
              </li>
              <li>
                <strong>Mozilla Firefox:</strong>{" "}
                <a
                  href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Configuración de cookies en Firefox
                </a>
              </li>
              <li>
                <strong>Internet Explorer:</strong>{" "}
                <a
                  href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Configuración de cookies en Internet Explorer
                </a>
              </li>
              <li>
                <strong>Safari:</strong>{" "}
                <a
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Configuración de cookies en Safari
                </a>
              </li>
              <li>
                <strong>Microsoft Edge:</strong>{" "}
                <a
                  href="https://support.microsoft.com/es-es/help/4027947/microsoft-edge-delete-cookies"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Configuración de cookies en Edge
                </a>
              </li>
            </ul>

            <p className="mb-4">
              Si deshabilita las cookies, es posible que algunas funcionalidades de la web no estén
              disponibles.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm">
                <strong>Importante:</strong> La desactivación de cookies técnicas puede impedir el correcto
                funcionamiento de algunas funcionalidades del sitio web.
              </p>
            </div>
          </section>

          {/* Actualización de la Política de Cookies */}
          <section id="actualizacion" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              5. Actualización de la Política de Cookies
            </h2>
            <p className="mb-4">
              Emma Louise Walker puede modificar esta Política de Cookies en función de exigencias
              legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones
              dictadas por la Agencia Española de Protección de Datos.
            </p>
            <p className="mb-4">
              Cuando se produzcan cambios significativos en esta Política de Cookies, se comunicará a los
              usuarios bien mediante la web o a través de correo electrónico a los usuarios registrados.
            </p>
          </section>

          {/* Más información */}
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              Más Información
            </h2>
            <p className="mb-4">
              Para más información sobre cómo utilizamos sus datos personales, consulte nuestra{" "}
              <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                Política de Privacidad
              </Link>.
            </p>
            <p className="mb-4">
              Si tiene cualquier duda sobre esta Política de Cookies, puede contactar con nosotros en:{" "}
              <a href="mailto:fusionstudioscoin@gmail.com" className="text-blue-600 hover:underline">
                fusionstudioscoin@gmail.com
              </a>
            </p>
          </section>

          <p className="mt-8 text-sm text-gray-600">
            Última actualización: Enero 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;


