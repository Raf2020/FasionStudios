"use client";

const LegalNoticePage = () => {
  return (
    <div className="w-full px-6 pb-10 sm:px-15 sm:pb-20">
      <div className="w-full pt-28 pb-6 sm:pt-40 sm:pb-10">
        <h1 className="text-black text-2xl sm:text-[52px] sm:leading-[64px] mb-6">
          Aviso Legal
        </h1>

        {/* Table of Contents */}
        <nav className="mb-10 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Contenido
          </h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#identificacion" className="text-blue-600 hover:underline">1. Identificación</a></li>
            <li><a href="#acceso" className="text-blue-600 hover:underline">2. Acceso al Sitio Web</a></li>
            <li><a href="#uso" className="text-blue-600 hover:underline">3. Uso del Sitio Web</a></li>
            <li><a href="#propiedad" className="text-blue-600 hover:underline">4. Derechos de Propiedad Intelectual</a></li>
            <li><a href="#finalidad" className="text-blue-600 hover:underline">5. Finalidad</a></li>
            <li><a href="#derechos" className="text-blue-600 hover:underline">6. Ejercicio de Derechos</a></li>
            <li><a href="#destinatarios" className="text-blue-600 hover:underline">7. Destinatarios</a></li>
            <li><a href="#reclamacion" className="text-blue-600 hover:underline">8. Reclamación</a></li>
            <li><a href="#proteccion" className="text-blue-600 hover:underline">9. Protección de Datos</a></li>
          </ul>
        </nav>

        <div className="prose max-w-none">
          {/* Identificación */}
          <section id="identificacion" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              1. Identificación
            </h2>
            <p className="mb-4">
              En cumplimiento del artículo 10 de la Ley 34/2002, del 11 de Julio, de Servicios de la Sociedad de
              la Información y Comercio Electrónico (LSSICE) se exponen a continuación los datos identificativos
              de la empresa.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
              <ul className="space-y-2 text-gray-800">
                <li><strong>Denominación social:</strong> Emma Louise Walker</li>
                <li><strong>CIF:</strong> X5953361H</li>
                <li><strong>Domicilio social:</strong> C/ Arquímedes, 42 29100 Coín (Málaga)</li>
                <li><strong>Sitio Web:</strong> <a href="https://www.fusionstudios.es" className="text-blue-600 hover:underline">https://www.fusionstudios.es</a></li>
                <li><strong>Correo electrónico:</strong> <a href="mailto:fusionstudioscoin@gmail.com" className="text-blue-600 hover:underline">fusionstudioscoin@gmail.com</a></li>
              </ul>
            </div>
          </section>

          {/* Acceso al Sitio Web */}
          <section id="acceso" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              2. Acceso al Sitio Web
            </h2>
            <p className="mb-4">
              El acceso al sitio web es responsabilidad exclusiva de los usuarios, y supone aceptar y conocer las
              advertencias legales, condiciones y términos de uso contenidos en ella. El sitio web tiene el
              carácter únicamente informativo, en consecuencia, los artículos, productos y/o servicios
              expuestos, así como, en su caso, los precios indicados, son meramente orientativos y su uso es
              exclusivo para los medios de comunicación; por lo que en ningún momento deben ser
              considerados como una oferta comercial.
            </p>
            <p className="mb-4">
              De aquí se sigue, que el sitio web no garantiza que los
              artículos, productos y/o servicios expuestos en la web estén disponibles, así como que los precios
              sean los vigentes en el momento de la consulta a la web. Emma Louise Walker se reserva el
              derecho de realizar, en cualquier momento, cuantos cambios y modificaciones estime
              convenientes y crea necesarias para la página web sin necesidad de previo aviso.
            </p>
            <p className="mb-4">
              El Usuario garantiza la autenticidad y veracidad de todos aquellos datos que comunique tanto en
              la cumplimentación de los formularios de registro como en cualquier otro momento posterior,
              siendo de su responsabilidad el actualizar la información suministrada, de tal forma que refleje su
              situación real. El usuario será responsable de la inexactitud o falta de veracidad de la información
              aportada.
            </p>
            <p className="mb-4">
              El simple acceso a este sitio web no supone entablar ningún tipo de relación comercial entre Emma
              Louise Walker y el usuario. El acceso y la navegación en este sitio web supone aceptar y conocer
              las advertencias legales, condiciones y términos de uso contenidas en ella. El titular del sitio web
              puede ofrecer servicios o productos que podrán encontrarse sometidos a unas condiciones
              particulares propias que, según los casos, sustituyan, completen y/o modifiquen las presentes
              condiciones, y sobre las cuales se informará al usuario en cada caso concreto.
            </p>
          </section>

          {/* Uso del Sitio Web */}
          <section id="uso" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              3. Uso del Sitio Web
            </h2>
            <p className="mb-4">
              El Usuario se compromete a la correcta utilización de la web y utilidades que se le proporcionen
              conforme a la ley, el presente documento legal, y las instrucciones y avisos que se le comuniquen.
              El Usuario se obliga al uso exclusivo de la web, y todos sus contenidos, para fines lícitos y no
              prohibidos, que no infrinjan la legalidad vigente y/o puedan resultar lesivos de los derechos
              legítimos de Emma Louise Walker o de cualquier tercero, y/o que puedan causar cualquier daño o
              perjuicio de forma directa o indirecta.
            </p>
            <p className="mb-4">
              A tal efecto, el Usuario se abstendrá de utilizar cualquiera de los contenidos de la página web con
              fines o efectos ilícitos, prohibidos en el presente Documento Legal, lesivos de los derechos e
              intereses de terceros o que, de cualquier forma, puedan dañar, inutilizar, sobrecargar, deteriorar
              o impedir la normal utilización de la web, los equipos informáticos o los documentos, archivos y
              toda clase de contenidos almacenados en cualquier equipo informático (hacking) de Emma Louise
              Walker, de otros Usuarios o de cualquier usuario de Internet (hardware y software).
            </p>
            <p className="mb-4">
              En particular, y a título meramente indicativo y no exhaustivo, el Usuario se compromete a no
              transmitir, difundir o poner a disposición de terceros informaciones, datos, contenidos, mensajes,
              gráficos, dibujos, archivos de sonido y/o imagen, fotografías, grabaciones, software y, en general,
              cualquier clase de material contrario al ordenamiento legal.
            </p>
            <p className="mb-4">
              Los Contenidos incluidos en el Sitio Web se facilitan únicamente a consumidores o Usuarios finales.
              Cualquier uso comercial no autorizado de los mismos, o su reventa, quedan prohibidos, salvo que
              se cuente con la previa autorización escrita. Emma Louise Walker podrá modificar los términos y
              condiciones aquí estipulados, total o parcialmente, publicando cualquier cambio en la misma
              forma en que aparecen estas condiciones generales o a través de cualquier tipo de comunicación
              dirigida a los usuarios.
            </p>
            <p className="mb-4">
              Emma Louise Walker no garantiza ni se hace responsable de: el funcionamiento del sitio web; la continuidad de los
              Contenidos del sitio web; la ausencia de errores en dichos Contenidos ni la corrección de cualquier
              defecto que pudiera ocurrir; la ausencia de virus y/o demás componentes dañinos en el sitio web
              o en el servidor que lo suministra; la invulnerabilidad del sitio web y/o la inexpugnabilidad de las
              medidas de seguridad que se adopten en el mismo; la falta de utilidad o rendimiento de los
              contenidos del sitio web; los daños o perjuicios que cause, a sí mismo o a un tercero, cualquier
              persona que infringiera las condiciones, normas e instrucciones que Emma Louise Walker
              establece en el sitio web o a través de la vulneración de los sistemas de seguridad del sitio web.
            </p>
          </section>

          {/* Derechos de Propiedad Intelectual */}
          <section id="propiedad" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              4. Derechos de Propiedad Intelectual
            </h2>
            <p className="mb-4">
              El Usuario se obliga a respetar los derechos de propiedad industrial de Emma Louise Walker y de
              cualquier otro tercero. El uso o la concesión de acceso a la página Web no comportan el
              otorgamiento de derecho alguno sobre las marcas, nombres comerciales o cualquier otro signo
              distintivo que se utilicen en la misma.
            </p>
            <p className="mb-4">
              El usuario podrá descargarse la página web en su terminal
              siempre que sea para uso privado, sin ningún fin comercial, por lo que no podrá explotar,
              reproducir, distribuir, modificar, comunicar públicamente, ceder, transformar o usar el contenido
              de la web con fines públicos o comerciales.
            </p>
            <p className="mb-4">
              Asimismo, los contenidos son propiedad intelectual de
              Emma Louise Walker sin que puedan entenderse cedidos al Usuario, en virtud de lo establecido en
              este Documento Legal, ninguno de los derechos de explotación o cualesquiera otros que existen o
              puedan existir sobre dichos contenidos más allá de lo estrictamente necesario para el correcto uso
              del sitio web.
            </p>
          </section>

          {/* Finalidad */}
          <section id="finalidad" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              5. Finalidad
            </h2>
            <p className="mb-4">
              El derecho a la libertad de información a través de medios digitales. Remisión de boletines
              informativos o newsletter asociados a las secciones o ediciones que conforman Emma Louise
              Walker incluyéndose aquellos requeridos para dar cumplimiento a los requisitos legales del RGPD.
              Gestión de plataformas sociales titularidad o asociadas a Emma Louise Walker. Aquellos necesarios
              para poder continuar prestando el servicio de comunicación digital. Sorteos, promociones y
              eventos. Cookies propias. Contacto, resolver incidencias, gestionar consultas asociadas al servicio
              o a cualquier otra situación análoga en relación con Emma Louise Walker.
            </p>
          </section>

          {/* Ejercicio de Derechos */}
          <section id="derechos" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              6. Ejercicio de Derechos
            </h2>
            <p className="mb-4">
              Acceso, rectificación o supresión, limitación de tratamiento, oposición del tratamiento de los datos
              personales facilitados o al envío de publicidad, y a no ser objeto de decisiones exclusivamente
              automatizadas. Puede ejercer dichos derechos o revocar los consentimientos de tratamiento
              dados enviando una petición al domicilio social, incluyendo una copia del DNI.
            </p>
            <p className="mb-4">
              Para el ejercicio de
              los derechos o cualquier aclaración que precise puede dirigir un correo postal a la dirección social,
              acreditando ser titular de los datos sobre los que quiere ejercer esos derechos.
            </p>
          </section>

          {/* Destinatarios */}
          <section id="destinatarios" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              7. Destinatarios
            </h2>
            <p className="mb-4">
              Emma Louise Walker precisa dentro de su ámbito de actividad con la finalidad de poder garantizar
              el servicio y la calidad del mismo que terceros a aquel presten servicios que pudieren llevar afectos
              tratamiento de datos personales. En relación a dichos terceros, Emma Louise Walker diferencia
              entre aquellos terceros que ostentan la condición de Encargado de Tratamiento siendo necesarios
              para en interés de la entidad, habiendo establecido las medidas legales y técnicas necesarias para
              preservar su derecho fundamental a la protección de datos.
            </p>
            <p className="mb-4">
              Así mismo, en relación con aquellos
              terceros que no se encuentren en dicha situación, Emma Louise Walker le informará de la
              comunicación y la necesidad, en su caso, de obtener su consentimiento para el tratamiento afecto
              a la operación/es afectas.
            </p>
          </section>

          {/* Reclamación */}
          <section id="reclamacion" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              8. Reclamación
            </h2>
            <p className="mb-4">
              Autoridad de Control competente en la materia. Agencia Española de Protección de Datos
              (<a href="https://www.agpd.es" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.agpd.es</a> C/ Jorge Juan, 6 28001 Madrid.)
            </p>
            <p className="mb-4">
              Puede ejercer dichos derechos o revocar los
              consentimientos de tratamiento dados enviando una petición al domicilio social, incluyendo una
              copia del DNI. Para el ejercicio de los derechos o cualquier aclaración que precise puede dirigir un
              correo postal a la dirección social, acreditando ser titular de los datos sobre los que quiere ejercer
              esos derechos.
            </p>
          </section>

          {/* Protección de Datos */}
          <section id="proteccion" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              9. Protección de Datos de Carácter Personal
            </h2>
            <p className="mb-4">
              De acuerdo con lo establecido en el Reglamento UE 2016/679 del Parlamento Europeo y del
              Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas en lo que respecta al
              tratamiento de datos personales y a la libre circulación de estos datos y la Ley Orgánica 15/1999,
              de 13 de Diciembre, de Protección de Datos de Carácter Personal, se le informa que los datos de
              carácter personal proporcionados serán incluidos en un fichero de titularidad de Emma Louise
              Walker, que tiene por finalidad la gestión de los clientes, contable, fiscal, administrativa y otras
              finalidades.
            </p>
            <p className="mb-4">
              Usted puede ejercer los derechos sobre los datos suministrados recogidos en el art.
              13 del RGPD de acceso, rectificación o supresión, limitación de tratamiento, oposición del
              tratamiento de los datos personales facilitados o al envío de publicidad, y a no ser objeto de
              decisiones exclusivamente automatizadas.
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

export default LegalNoticePage;
