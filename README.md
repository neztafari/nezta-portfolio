# nezta-portfolio

Website portofolio Nezta Misgi Febyandanu. Dibangun dengan Next.js (App Router, TypeScript), tanpa backend dan tanpa database.

## Jalanin di laptop (Windows / PowerShell)

Butuh Node.js versi LTS (cek dengan `node -v`).

```powershell
cd C:\Users\<nama-user>\Documents\nezta-portfolio
npm install
npm run dev
```

Buka http://localhost:3000. Setiap file yang kamu simpan langsung kelihatan di browser.

Cek sebelum deploy:

```powershell
npm run lint
npm run build
```

## Struktur

```
app/
  layout.tsx        font, judul tab, deskripsi untuk Google
  page.tsx          urutan section di halaman
  globals.css       semua styling dan warna
  icon.svg          favicon
  fonts/            file font (Unbounded, Geist, Geist Mono)
components/
  sections/         satu file per section: Hero, Journey, Experience, Projects, Skills, Education, Contact
  previews/         ilustrasi project (dipakai kalau belum ada screenshot)
  Nav.tsx, HeroField.tsx, LiveFps.tsx, ...   komponen interaktif ('use client')
data/
  profile.ts        SEMUA isi CV ada di sini
public/
  nezta-grad.jpg    foto profil (potret 2:3)
  projects/         taruh screenshot project di sini
```

## Ganti isi

- **Isi CV** (pengalaman, project, skill, sertifikat): edit `data/profile.ts` saja.
- **Foto profil**: ganti `public/nezta-grad.jpg` dengan foto baru (potret 2:3, nama file sama). Foto dipotong ke bingkai 4:5; atur bagian yang terlihat lewat prop `position` (object-position, mis. `"40% 22%"`) dan sesuaikan `width`/`height` dengan ukuran asli foto di `components/sections/Hero.tsx`.
- **Screenshot project**: simpan gambar di `public/projects/`, misalnya `dx-workspace.png`, lalu di `data/profile.ts` tambahkan `image: "/projects/dx-workspace.png"` pada project itu. Ilustrasi otomatis diganti screenshot.
- **Warna**: variabel `--blue` dan `--red` di bagian atas `app/globals.css`.

## Catatan

- Flight Tracker dan DX Workspace adalah proyek internal Garuda Indonesia. Pastikan sudah diizinkan sebelum website dipublikasikan, dan jangan pakai screenshot yang menampilkan data internal.
- Deploy: push ke GitHub, lalu import repo di https://app.netlify.com.
