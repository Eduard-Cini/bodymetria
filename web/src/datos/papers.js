// Compilación de la evidencia citada en Bodymetria, agrupada por sección.
// Cada entrada: referencia + tema. La misma referencia puede aparecer en dos
// secciones si sustenta ideas distintas.

export const PAPERS = [
  {
    seccion: 'Nutrición y micronutrientes',
    refs: [
      { ref: 'Reynolds A, et al. Lancet, 2019.', tema: 'Fibra y menor riesgo cardiometabólico.' },
      { ref: 'Aune D, et al. Int J Epidemiol, 2017.', tema: 'Frutas y verduras y menor mortalidad.' },
      { ref: 'Naghshi S, et al. BMJ, 2020.', tema: 'Proteína vegetal y menor mortalidad.' },
      { ref: 'Tai V, et al. BMJ, 2015.', tema: 'Calcio de la dieta y densidad ósea.' },
      { ref: 'Hallberg L, Hulthén L. Am J Clin Nutr, 2000.', tema: 'Absorción del hierro vegetal con vitamina C.' },
      { ref: 'Fang X, et al. BMC Medicine, 2016.', tema: 'Magnesio y riesgo cardiovascular/diabetes.' },
      { ref: 'Hemilä H. JRSM Open, 2017.', tema: 'Zinc y duración del resfriado.' },
      { ref: 'Aburto NJ, et al. BMJ, 2013.', tema: 'Potasio y sodio y presión arterial.' },
      { ref: 'Zimmermann MB. Endocrine Reviews, 2009.', tema: 'Yodo y función tiroidea.' },
      { ref: 'Rayman MP. Lancet, 2012.', tema: 'Selenio: ventana estrecha entre déficit y exceso.' },
      { ref: 'MRC Vitamin Study. Lancet, 1991.', tema: 'Ácido fólico y defectos del tubo neural.' },
      { ref: 'Hemilä H, Chalker E. Cochrane, 2013.', tema: 'Vitamina C y resfriado.' },
      { ref: 'Neale RE, et al. 2019; Holick MF. NEJM, 2007.', tema: 'Vitamina D, sol y bloqueador.' },
      { ref: 'Miller ER, et al. Ann Intern Med, 2005.', tema: 'Suplementos de vitamina E en dosis altas.' },
      { ref: 'Pawlak R, et al. Nutrition Reviews, 2013.', tema: 'B12 en dietas veganas.' },
      { ref: 'Abdelhamid AS, et al. Cochrane, 2020.', tema: 'Omega-3: pescado vs cápsulas.' },
      { ref: 'Kraus WE, et al. (CALERIE). Lancet Diabetes Endocrinol, 2019.', tema: 'Restricción calórica ligera y marcadores.' },
    ],
  },
  {
    seccion: 'Ejercicio y recomposición corporal',
    refs: [
      { ref: 'Shailendra P, Baldock KL, et al. Am J Prev Med, 2022.', tema: 'Fuerza y mortalidad: máximo beneficio a 30-60 min/semana (curva en J).' },
      { ref: 'Momma H, et al. Br J Sports Med, 2022.', tema: 'Fuerza y menor mortalidad, cáncer y ECV.' },
      { ref: 'Paluch AE, et al. Lancet Public Health, 2022.', tema: 'Pasos diarios y mortalidad.' },
      { ref: 'Morton RW, et al. Br J Sports Med, 2018.', tema: 'Proteína (~1.6 g/kg) e hipertrofia.' },
      { ref: 'Schoenfeld BJ, et al. J Sports Sci, 2017.', tema: 'Volumen semanal e hipertrofia (dosis-respuesta).' },
      { ref: 'Schoenfeld BJ, et al. J Strength Cond Res, 2021.', tema: 'Cargas altas vs moderadas cerca del fallo.' },
      { ref: 'Longland TM, et al. Am J Clin Nutr, 2016.', tema: 'Recomposición: déficit + proteína alta + fuerza.' },
      { ref: 'Willis LH, et al. J Appl Physiol, 2012.', tema: 'Aeróbico vs fuerza vs combinado.' },
      { ref: 'Levine JA. Best Pract Res Clin Endocrinol Metab, 2002.', tema: 'NEAT: actividad no-ejercicio y gasto.' },
    ],
  },
  {
    seccion: 'Suplementación',
    refs: [
      { ref: 'Kreider RB, et al. J Int Soc Sports Nutr, 2017.', tema: 'Creatina: eficacia y seguridad.' },
      { ref: 'Morton RW, et al. Br J Sports Med, 2018.', tema: 'Proteína en polvo solo si no llegas a tu meta.' },
      { ref: 'Trexler ET, et al. J Int Soc Sports Nutr, 2015.', tema: 'Beta-alanina en esfuerzos de 1-4 min.' },
      { ref: 'Gonzalez AM, Trexler ET. J Strength Cond Res, 2020.', tema: 'Citrulina malato: evidencia mixta.' },
      { ref: 'Figueroa A, et al. Am J Hypertens, 2011-2012.', tema: 'Sandía/citrulina y presión arterial.' },
      { ref: 'Serban C, et al. J Hypertens, 2015.', tema: 'Jamaica (hibisco) y presión arterial.' },
      { ref: 'Domínguez R, et al. Nutrients, 2017.', tema: 'Betabel (nitratos) y resistencia.' },
      { ref: 'Kuriyama S, et al. JAMA, 2006.', tema: 'Té verde y mortalidad cardiovascular.' },
    ],
  },
  {
    seccion: 'Sueño',
    refs: [
      { ref: 'Cappuccio FP, et al. Sleep, 2010.', tema: 'Duración del sueño y mortalidad (óptimo 7-8 h).' },
      { ref: 'Irish LA, et al. Sleep Med Rev, 2015.', tema: 'Higiene del sueño y horario regular.' },
      { ref: 'Drake C, et al. J Clin Sleep Med, 2013.', tema: 'Cafeína hasta 6 h antes reduce el sueño.' },
      { ref: 'Chang AM, et al. PNAS, 2015.', tema: 'Pantallas nocturnas y melatonina.' },
      { ref: 'Okamoto-Mizuno K, Mizuno K. J Physiol Anthropol, 2012.', tema: 'Temperatura del cuarto y calidad del sueño.' },
      { ref: 'Stutz J, et al. Sports Med, 2019.', tema: 'Ejercicio y calidad del sueño.' },
      { ref: 'Ebrahim IO, et al. Alcohol Clin Exp Res, 2013.', tema: 'Alcohol y fragmentación del sueño.' },
      { ref: 'Brooks A, Lack L. Sleep, 2006.', tema: 'Siestas cortas y alerta.' },
    ],
  },
  {
    seccion: 'Hábitos y longevidad (app)',
    refs: [
      { ref: 'Warburton DER, et al. CMAJ, 2006.', tema: 'Beneficios de la actividad física.' },
      { ref: 'Dmitrieva NI, et al. eBioMedicine, 2023.', tema: 'Hidratación y envejecimiento biológico.' },
      { ref: 'Goyal M, et al. JAMA Intern Med, 2014.', tema: 'Meditación y estrés/ansiedad.' },
      { ref: 'Bavishi A, Slade MD, Levy BR. Soc Sci Med, 2016.', tema: 'Leer libros y supervivencia.' },
      { ref: 'Twenge JM, Campbell WK. Prev Med Rep, 2018.', tema: 'Tiempo de pantalla y bienestar.' },
    ],
  },
]
