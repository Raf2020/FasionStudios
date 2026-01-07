"use client";

const PrivacyPolicyPage = () => {
  return (
    <div className="w-full px-6 pb-10 sm:px-15 sm:pb-20">
      <div className="w-full pt-28 pb-6 sm:pt-40 sm:pb-10">
        <h1 className="text-black text-2xl sm:text-[52px] sm:leading-[64px] mb-6">
          Política de Privacidad
        </h1>

        {/* Table of Contents */}
        <nav className="mb-10 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Contenido
          </h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#ambito" className="text-blue-600 hover:underline">1. Ámbito de Aplicación</a></li>
            <li><a href="#responsable" className="text-blue-600 hover:underline">2. Responsable del Tratamiento</a></li>
            <li><a href="#encargado" className="text-blue-600 hover:underline">3. Encargado de Tratamiento</a></li>
            <li><a href="#finalidad" className="text-blue-600 hover:underline">4. Finalidad para Recabar su Información</a></li>
            <li><a href="#informacion-recabada" className="text-blue-600 hover:underline">5. Información Recabada</a></li>
            <li><a href="#informacion-web" className="text-blue-600 hover:underline">6. Información Recabada en la Visita a Nuestra Web</a></li>
            <li><a href="#legitimacion" className="text-blue-600 hover:underline">7. Legitimación para el Tratamiento</a></li>
            <li><a href="#cesion" className="text-blue-600 hover:underline">8. Cesión de Datos</a></li>
            <li><a href="#transferencia" className="text-blue-600 hover:underline">9. Transferencia Internacional</a></li>
            <li><a href="#enlaces" className="text-blue-600 hover:underline">10. Enlaces a Sitios Web de Terceros</a></li>
            <li><a href="#almacenamiento" className="text-blue-600 hover:underline">11. Tiempo de Almacenamiento</a></li>
            <li><a href="#ejercer-derechos" className="text-blue-600 hover:underline">12. Cómo Ejercer sus Derechos</a></li>
          </ul>
        </nav>

        <div className="prose max-w-none">
          {/* Introducción */}
          <section className="mb-10">
            <p className="mb-4">
              El simple acceso a este sitio web no supone entablar ningún tipo de relación comercial entre
              Emma Louise Walker y el usuario. El acceso y la navegación en este sitio web supone aceptar y
              conocer las advertencias legales, condiciones y términos de uso contenidas en ella. El titular del
              sitio web puede ofrecer servicios o productos que podrán encontrarse sometidos a unas
              condiciones particulares propias que, según los casos, sustituyan, completen y/o modifiquen las
              presentes condiciones, y sobre las cuales se informará al usuario en cada caso concreto.
            </p>
            <p className="mb-4">
              Al facilitarnos su información personal y utilizar nuestros sitios web, entendemos que ha leído
              y comprendido los términos relacionados con la información de protección de datos de carácter
              personal que se exponen. Emma Louise Walker asume la responsabilidad de cumplir con la
              legislación vigente en materia de protección de datos nacional y europea, y tienen el objetivo
              de tratar sus datos de manera lícita, leal y transparente.
            </p>
          </section>

          {/* Ámbito de Aplicación */}
          <section id="ambito" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              1. Ámbito de Aplicación
            </h2>
            <p className="mb-4">
              El presente documento es de aplicación a Emma Louise Walker.
            </p>
          </section>

          {/* Responsable del Tratamiento */}
          <section id="responsable" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              2. Responsable del Tratamiento
            </h2>
            <p className="mb-4">
              La definición de responsable de tratamiento viene descrita en el Reglamento General de
              Protección de datos, y es la siguiente:
            </p>
            <p className="mb-4 font-semibold">
              RESPONSABLE DEL TRATAMIENTO» O «RESPONSABLE»
            </p>
            <p className="mb-4">
              La persona física o jurídica, autoridad pública, servicio u otro organismo que, solo o junto con
              otros, determine los fines y medios del tratamiento.
            </p>
            <p className="mb-4">
              Emma Louise Walker es responsable del tratamiento de la información personal que realiza de
              sus clientes.
            </p>
            <p className="mb-4">
              Si tiene cualquier tipo de consulta puede enviar un correo a la dirección de correo{" "}
              <a href="mailto:fusionstudioscoin@gmail.com" className="text-blue-600 hover:underline">
                fusionstudioscoin@gmail.com
              </a>
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
              <h3 className="font-semibold mb-3">Información sobre Emma Louise Walker</h3>
              <ul className="space-y-2 text-gray-800">
                <li><strong>Razón social:</strong> Emma Louise Walker</li>
                <li><strong>Domicilio social:</strong> C/ Arquímedes, 42 29100 Coín (Málaga)</li>
                <li><strong>Correo electrónico:</strong> <a href="mailto:fusionstudioscoin@gmail.com" className="text-blue-600 hover:underline">fusionstudioscoin@gmail.com</a></li>
                <li><strong>Teléfono:</strong> 685 - 44.53.33</li>
                <li><strong>CIF:</strong> X5953361H</li>
                <li><strong>Página web:</strong> <a href="https://www.fusionstudios.es" className="text-blue-600 hover:underline">https://www.fusionstudios.es</a></li>
              </ul>
            </div>
          </section>

          {/* Encargado de Tratamiento */}
          <section id="encargado" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              3. Encargado de Tratamiento
            </h2>
            <p className="mb-4">
              Es la persona física o jurídica, autoridad pública, servicio u otro organismo que presta un servicio
              al responsable que conlleva el tratamiento de datos personales por cuenta de éste. Los tipos de
              encargado del tratamiento y las formas en que se regulará su relación pueden ser los tipos de
              servicios que puedan suponer acceso a datos personales. En el presente caso nos encontramos
              que se tratan datos personales sólo como consecuencia de la actividad que se presta por cuenta
              del responsable del tratamiento.
            </p>
            <p className="mb-4">
              Corresponde al responsable decidir sobre la finalidad y los usos
              de la información, mientras que el encargado del tratamiento debe cumplir con las instrucciones
              de quien le encomienda un determinado servicio, respecto al correcto tratamiento de los datos
              personales a los que pueda tener acceso como consecuencia de la prestación de este servicio.
            </p>
          </section>

          {/* Finalidad */}
          <section id="finalidad" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              4. Finalidad para Recabar su Información Personal
            </h2>
            <p>
            De acuerdo con lo establecido en el Reglamento UE 2016/679 del Parlamento Europeo y del
              Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas en lo que respecta
              al tratamiento de datos personales y a la libre circulación de estos datos y la Ley Orgánica
              15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal, se le informa que
              los datos de carácter personal proporcionados serán incluidos en un fichero de titularidad de
              Emma Louise Walker.
            </p>
            <p className="mb-4">
              La razón principal por la que recabamos su información personal es para facilitar y mejorar el
              servicio prestado.
            </p>
            <h3 className="font-semibold mb-3">Finalidades:</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Cumplimiento de obligaciones legales.</li>
              <li>Gestión de los clientes, contable, fiscal, administrativa y otras finalidades.</li>
              <li>Gestión de la contratación de productos o servicios ofrecidos por Emma Louise Walker.</li>
              <li>Crear y gestionar una cuenta personal con registro único para que sea utilizado en la adquisición
                de productos y servicios ofertados en la web de Emma Louise Walker.</li>
              <li>Mantenerle informado, sobre nuestros últimos servicios, productos, ofertas, etc. Los canales
                que utilizamos habitualmente son: correo electrónico, correo postal, teléfono, SMS, pero solo
                si usted nos presta su consentimiento.</li>
            </ul>
          </section>

          {/* Información Recabada */}
          <section id="informacion-recabada" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              5. Información Recabada
            </h2>
            <p className="mb-4">
              Recabamos información personal sobre usted al contactar con nosotros y compartir su
              información personal que usted nos facilita a través de la web de Emma Louise Walker, como
              correo electrónico, teléfono móvil, etc. cuando contrata un servicio, cuando rellena un
              formulario, u otros. En cualquier caso, en el momento de la recogida se le informará del
              responsable del tratamiento, la finalidad del mismo, los destinatarios de la información, así
              como la forma de ejercer los derechos que le otorga la legislación vigente en protección de
              datos.
            </p>
            <p className="mb-4">
              Generalmente, la información personal que usted nos facilita son: nombre y apellidos, domicilio,
              DNI, correo electrónico, teléfono de contacto y datos de pago. En casos muy particulares, y
              dependiendo de la finalidad y uso previsto de sus datos, se podrán recabar otros datos.
            </p>
          </section>

          {/* Información Recabada en la Visita a Nuestra Web */}
          <section id="informacion-web" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              6. Información Recabada en la Visita a Nuestra Web
            </h2>
            <p className="mb-4">
              Recabamos y almacenamos información personal limitada y estadísticas globales anónimas de
              todos aquellos usuarios que visitan nuestras webs, ya sea porque usted nos facilite dicha
              información de forma activa o se encuentre simplemente navegando en nuestras webs. La
              información que recabamos incluye la dirección del protocolo de Internet (IP) del dispositivo
              que está usando, el programa de navegación que utiliza, su sistema operativo, la fecha y hora
              del acceso, la dirección de Internet de la web por la que accedió a nuestras webs y también
              información sobre cómo utiliza nuestras webs.
            </p>
            <p className="mb-4">
              Esta información la utilizamos para saber el tiempo de carga de nuestras webs, cómo se utilizan.
              También ayuda a identificar si la web funciona correctamente, y si detectamos fallos o errores
              en el funcionamiento, solucionarlos y mejorar el rendimiento de nuestras webs, para poder
              ofrecer un mejor servicio a todos los usuarios.
            </p>
            <p className="mb-4">
              Esta información se recaba a través de cookies, para más información consulte la política de
              cookies que podrá localizar en la web de Emma Louise Walker.
            </p>
          </section>

          {/* Legitimación */}
          <section id="legitimacion" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              7. Legitimación para el Tratamiento de la Información Personal
            </h2>
            <p className="mb-4">
              Para el tratamiento de su información personal nos basamos en la legitimación por varios
              motivos:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Para el cumplimiento de un contrato y/o relación comercial.</li>
              <li>Para el cumplimiento de distintas obligaciones legales.</li>
              <li>Por interés legítimo, por ejemplo, por motivos de seguridad, prevención del fraude, para
                mejorar nuestros servicios y productos a través de estudios de mercado, o para gestionar las
                solicitudes, consultas o posibles reclamaciones que pudieran surgir.</li>
              <li>Con su consentimiento expreso, podrá recibir ofertas personalizadas de Emma Louise Walker.</li>
            </ul>
          </section>

          {/* Cesión de Datos */}
          <section id="cesion" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              8. Cesión de Datos
            </h2>
            <p className="mb-4">
              Si usted ha dado su consentimiento, la información que nos facilita será tratada con las
              finalidades descritas anteriormente. No todas las finalidades descritas conllevan una cesión de
              datos.
            </p>
            <p className="mb-4">
              Hay terceras empresas que nos prestan otro tipo de servicios como son: tecnología de la
              información (almacenamiento y procesamiento de la información), servicios de seguridad,
              servicios financieros, servicios de auditoría, servicios logísticos, servicios fiscales, etc.
            </p>
            <p className="mb-4">
              Estas terceras partes solo tienen acceso a la información personal que necesitan para llevar a
              cabo dichos servicios. Se les exige que mantengan en confidencialidad su información personal
              y no pueden utilizarla de ninguna otra forma que aquella que se les ha solicitado.
            </p>
            <p className="mb-4">
              En todos los casos Emma Louise Walker asume la responsabilidad por la información personal
              que nos facilite, y solicitamos a aquellas empresas con los que compartimos su información
              personal que apliquen el mismo grado de protección de la información.
            </p>
            <p className="mb-4">
              Asimismo, su información personal estará a disposición de las Administraciones públicas, Jueces
              y Tribunales, para la atención de las posibles responsabilidades nacidas del tratamiento.
            </p>
          </section>

          {/* Transferencia Internacional */}
          <section id="transferencia" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              9. Transferencia Internacional
            </h2>
            <p className="mb-4">
              La información personal que recabamos reside en la UE y no se prevé realizar transferencias
              internacionales de datos.
            </p>
          </section>

          {/* Enlaces a Sitios Web de Terceros */}
          <section id="enlaces" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              10. Enlaces a Sitios Web de Terceros
            </h2>
            <p className="mb-4">
              En el caso que suministremos enlaces a sitios web que no son operados ni controlados por
              Emma Louise Walker, será puntualmente informado ya que Emma Louise Walker no dispone de
              control alguno sobre dichos sitios ni tampoco son responsables por el contenido de los mismos,
              tampoco tienen control sobre la forma en que terceros recaban y usan su información personal
              ni son responsables ni ofrecen declaración alguna sobre los sitios web de terceros.
            </p>
            <p className="mb-4">
              Estos sitios web dispongan de sus propias políticas de privacidad, mediante las cuales le
              explicarán cómo utilizan y comparten su información personal. Le recomendamos revisar
              detenidamente las políticas de privacidad antes de utilizar estos sitios web para estar seguro de
              que se encuentra conforme con la forma en la que su información personal se recopila y
              comparte.
            </p>
          </section>

          {/* Tiempo de Almacenamiento */}
          <section id="almacenamiento" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              11. Tiempo de Almacenamiento de la Información Personal
            </h2>
            <p className="mb-4">
              Solo almacenamos la información personal en la medida en que la necesitamos a fin de poder
              utilizarla según la finalidad por la que fue recabada, y según la base jurídica del tratamiento de
              la misma de conformidad con la ley aplicable.
            </p>
            <p className="mb-4">
              Conservaremos su información personal durante el tiempo que sea necesario para cumplir con
              las finalidades para las que fue recabada, para cumplir con requisitos legales, contables o de
              información, y/o para que Emma Louise Walker pueda defenderse ante posibles responsabilidades
              civiles o penales derivadas del tratamiento.
            </p>
            <p className="mb-4">
              Cuando la información personal ya no sea necesaria, la eliminaremos de forma segura.
            </p>
          </section>

          {/* Cómo Ejercer sus Derechos */}
          <section id="ejercer-derechos" className="mb-10 scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">
              12. Cómo Ejercer sus Derechos
            </h2>
            <p className="mb-4">
              Usted puede ejercer los derechos sobre los datos suministrados recogidos en el art. 13 del RGPD
              de acceso, rectificación o supresión, limitación de tratamiento, oposición del tratamiento de los
              datos personales facilitados o al envío de publicidad, y a no ser objeto de decisiones
              exclusivamente automatizadas.
            </p>
            <p className="mb-4">
              Puede ejercer dichos derechos o revocar los consentimientos de tratamiento dados enviando
              una petición al domicilio social, incluyendo una copia del DNI.
            </p>
            <p className="mb-4">
              Para el ejercicio de los derechos o cualquier aclaración que precise puede dirigir un correo
              postal a la dirección social, acreditando ser titular de los datos sobre los que quiere ejercer esos
              derechos.
            </p>
            <p className="mb-4">
              Asimismo, le informamos que tiene derecho a presentar una reclamación ante la Agencia
              Española de Protección de Datos (<a href="https://www.agpd.es" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.agpd.es</a>).
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

export default PrivacyPolicyPage;
