# -*- coding: utf-8 -*-
"""Genera los PDFs de docs/ a partir de sus .md.

Parser de un subconjunto de Markdown (encabezados #/##, viñetas con
continuación, **negritas**, `código`) hacia reportlab/platypus.
Uso: python docs/generar_pdfs.py  (desde la raíz del proyecto o docs/)
"""
import datetime
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer

AQUI = Path(__file__).parent

# Caracteres fuera de WinAnsi (fuentes base de reportlab) -> sustituto legible
REEMPLAZOS = {
    "→": "->", "≥": ">=", "≤": "<=", "∈": " en ", "▲": "^", "▼": "v",
    "σ²": "sigma^2", "σ": "sigma", "Σ": "suma de", "μ": "mu", "×": "x",
}


def limpiar(texto: str) -> str:
    for k, v in REEMPLAZOS.items():
        texto = texto.replace(k, v)
    return texto


def inline(texto: str) -> str:
    """Escapa XML y convierte **negrita** y `código` al marcado de Paragraph."""
    texto = texto.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    texto = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", texto)
    texto = re.sub(r"`([^`]+)`", r'<font face="Courier" size="9">\1</font>', texto)
    return texto


def estilos():
    base = getSampleStyleSheet()
    return {
        "titulo": ParagraphStyle("titulo", parent=base["Title"], fontSize=26, spaceAfter=6),
        "subtitulo": ParagraphStyle(
            "subtitulo", parent=base["Normal"], fontSize=13,
            textColor=colors.HexColor("#5D4037"), spaceAfter=2,
        ),
        "h1": ParagraphStyle(
            "h1", parent=base["Heading1"], fontSize=15, spaceBefore=16, spaceAfter=6,
            textColor=colors.HexColor("#33691E"),
        ),
        "p": ParagraphStyle(
            "p", parent=base["Normal"], fontSize=10.5, leading=14.5, spaceAfter=6,
        ),
        "vineta": ParagraphStyle(
            "vineta", parent=base["Normal"], fontSize=10.5, leading=14.5,
            leftIndent=14, spaceAfter=3, bulletIndent=4,
        ),
    }


def md_a_story(md: str, est) -> list:
    story = []
    parrafo: list[str] = []
    vineta: list[str] = []

    def cerrar():
        nonlocal parrafo, vineta
        if parrafo:
            story.append(Paragraph(inline(" ".join(parrafo)), est["p"]))
            parrafo = []
        if vineta:
            story.append(Paragraph(inline(" ".join(vineta)), est["vineta"], bulletText="•"))
            vineta = []

    for linea in md.splitlines():
        linea = limpiar(linea.rstrip())
        if linea.startswith("# "):
            cerrar()  # el título del documento va en la portada
        elif linea.startswith("## "):
            cerrar()
            story.append(Paragraph(inline(linea[3:]), est["h1"]))
        elif linea.startswith("- "):
            cerrar()
            vineta = [linea[2:]]
        elif not linea.strip():
            cerrar()
        elif vineta and linea.startswith("  "):
            vineta.append(linea.strip())
        else:
            if vineta:
                cerrar()
            parrafo.append(linea.strip())
    cerrar()
    return story


def generar(nombre_md: str, titulo: str, subtitulo: str):
    md = (AQUI / nombre_md).read_text(encoding="utf-8")
    salida = AQUI / nombre_md.replace(".md", ".pdf")
    est = estilos()
    doc = SimpleDocTemplate(
        str(salida), pagesize=letter,
        leftMargin=2.2 * cm, rightMargin=2.2 * cm,
        topMargin=2.2 * cm, bottomMargin=2.2 * cm,
        title=titulo,
    )
    fecha = datetime.date.today().strftime("%d/%m/%Y")
    story = [
        Spacer(1, 5 * cm),
        Paragraph(titulo, est["titulo"]),
        Paragraph(subtitulo, est["subtitulo"]),
        Paragraph(f"Bodymetria · {fecha}", est["subtitulo"]),
        PageBreak(),
    ]
    story += md_a_story(md, est)
    doc.build(story)
    print(f"OK {salida.name}")


if __name__ == "__main__":
    generar(
        "documentacion-tecnica.md",
        "Documentación técnica",
        "Arquitectura, modelo de datos, metas y decisiones (v1)",
    )
    generar(
        "manual-aprendizaje.md",
        "Manual de aprendizaje",
        "De Kotlin y Android a todo lo que implementa la app",
    )
