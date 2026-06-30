# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },


  import streamlit as st
import pandas as pd
import numpy as np

st.set_page_config(
    page_title="Dashboard",
    page_icon="📖",
    layout="wide"
)

st.title("📖 Monitoring Hafalan Al-Qur'an")
st.write("Selamat datang, **Ustadz Ahmad**")

st.divider()

# =========================
# CARD STATISTIK
# =========================

col1, col2, col3, col4 = st.columns(4)

col1.metric(
    "Total Santri",
    120
)

col2.metric(
    "Hafal 30 Juz",
    35
)

col3.metric(
    "Sedang Aktif",
    85
)

col4.metric(
    "Rata-rata Nilai",
    "88"
)

st.divider()

# =========================
# GRAFIK
# =========================

left, right = st.columns(2)

with left:

    st.subheader("Perkembangan Hafalan")

    data = pd.DataFrame({
        "Minggu":[1,2,3,4,5],
        "Juz":[2,4,6,8,10]
    })

    st.line_chart(
        data.set_index("Minggu")
    )

with right:

    st.subheader("Distribusi Hafalan")

    juz = pd.DataFrame({
        "Juz":[
            "1-5",
            "6-10",
            "11-15",
            "16-20",
            "21-25",
            "26-30"
        ],
        "Santri":[
            20,
            35,
            28,
            18,
            12,
            7
        ]
    })

    st.bar_chart(
        juz.set_index("Juz")
    )

st.divider()

# =========================
# TABEL
# =========================

st.subheader("Data Santri Terbaru")

df = pd.DataFrame({

    "Nama":[
        "Ahmad",
        "Ali",
        "Fatimah",
        "Aisyah",
        "Budi"
    ],

    "Juz":[
        12,
        8,
        15,
        20,
        5
    ],

    "Nilai Tajwid":[
        90,
        88,
        95,
        97,
        82
    ],

    "Kelancaran":[
        87,
        84,
        92,
        95,
        80
    ],

    "Status":[
        "Aktif",
        "Aktif",
        "Aktif",
        "Aktif",
        "Belum Aktif"
    ]

})

st.dataframe(
    df,
    use_container_width=True
)
])
```
