# Horse Racing Game

At yarışı simülasyonu yapabileceğiniz interaktif bir web uygulaması. Vue.js ile geliştirilmiş, Atomic Design prensiplerini ve yeniden kullanılabilir bileşen mimarisini kullanan bir uygulama.

## Proje Yapısı

Proje, Atomic Design prensiplerine göre yapılandırılmıştır:

### Atoms
- BaseButton
- BaseCard
- MainFooter

### Molecules
- PanelHeader
- EmptyState
- RoundResultItem

### Organisms
- HorseList
- RoundResult
- MainHeader
- GameControls
- WelcomeScreen

### Templates
- GameLayout

### Composables
- useFormatters

## Teknolojiler

- Vue.js 3
- Vuex 4
- SCSS
- Jest

## Kurulum

```bash
npm install

npm run serve
```

## Test

```bash
npm test

npm test tests/unit/RoundResult.spec.js
```

## Build

```bash
npm run build
```
