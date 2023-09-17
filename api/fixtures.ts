import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

(async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;
  
  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('tracks');
    await db.dropCollection('trackhistories');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [Oxxxymiron, R1Fmabes, MC_No_Limit, Diktator_UAV, KnownAim, Booker, JesusAVGN] = await Artist.create(
    {
      name: 'Oxxxymiron',
      image: 'fixtures/oxxxymiron.jpg',
      info: 'Russian rap artist, songwriter and public figure.',
    },
    {
      name: 'R1Fmabes',
      image: 'fixtures/r1fmabes.png',
      info: 'Battle rapper from Kaluga, champion Break on Bits (season 1), participant of SLOVO: Moscow, organizer and participant of the Kaluga battle site More Than Battle (BCHB).',
    },
    {
      name: 'MC No Limit',
      image: 'fixtures/mc_no_limit.png',
      info: 'Grime artist from east London, born in Ukraine. Reads in Russian and English. No Limit is a veteran of the grime movement and in fact the first MC to start performing grime in Russian.',
    },
    {
      name: 'Диктатор UAV',
      image: 'fixtures/diktator.jpg',
      info: 'Rap artist, battle MC, semi-finalist of VRuBay Battle (Season 1) and participant of 140 BPM Battle.',
    },
    {
      name: 'KnownAim',
      image: 'fixtures/knownaim.jpg',
      info: 'KnownAim, also previously known as Niki-Tiki-Tavi (Nikita Dmitrievich Gashnikov) is a rap artist, battle MC, participant in SLOVO: Saint-Petersburg (season 1), participant in the 140 BPM Cup (season 1).',
    },
    {
      name: 'Booker',
      image: null,
      info: 'Booker, previously also known as Booker D. Fred (Fedor Dmitrievich Ignatiev) - rap artist, battle MC, finalist of Versus: Fresh Blood (season 2), semi-finalist of SLOVO: Saint-Petersburg (season 2), champion of #STRELASPB (1 season), former host of the rap project VSRAP RAPYOU battle. Former member of the creative association Antihype, founder of the NKVD team.'
    },
    {
      name: 'JesusAVGN',
      image: 'fixtures/hesus.jpeg',
      info: 'JesusAVGN is a Russian streamer, blogger and let\'s player, who gained fame thanks to YouTube and Twitch. Alexey created his YouTube channel called JesusAVGN on May 3, 2012. And on August 16, I opened an account on Twitch. At first he hid his face, but on December 31, 2015, he finally announced (showed his face).'
    },
  );

  const [miXXXtape_I, Eternal_Jew, Badman, Balance, Dogolya, KBCKMC, THE_BOX, Other] = await Album.create(
    {
      name: 'miXXXtape I',
      artist: Oxxxymiron._id,
      date: 2012,
      image: 'fixtures/mixxxtape1.jpg',
    },
    {
      name: 'Eternal Jew',
      artist: Oxxxymiron._id,
      date: 2011,
      image: 'fixtures/eternal_jew.png',
    },
    {
      name: 'Badman',
      artist: MC_No_Limit._id,
      date: 2017,
      image: 'fixtures/badman.jpg',
    },
    {
      name: 'Баланс',
      artist: Diktator_UAV._id,
      date: 2021,
      image: 'fixtures/balance.jpg',
    },
    {
      name: 'Доголя',
      artist: KnownAim._id,
      date: 2018,
      image: 'fixtures/dogolya.jpeg',
    },
    {
      name: 'КУБОК МЦ:11(Autotune Battle)',
      artist: KnownAim._id,
      date: 2022,
      image: 'fixtures/kbckmcexpainvsknownaim.jpeg',
    },
    {
      name: 'THE BOX',
      artist: Booker._id,
      date: 2018,
      image: 'fixtures/the_box.jpeg',
    },
    {
      name: 'Other',
      artist: JesusAVGN._id,
      date: 2021,
      image: null,
    },
  );

  await Track.create(
    {
      name: 'Мой менталитет',
      album: miXXXtape_I.id,
      duration: '2:56',
      number: 20,
      youtube: 'https://www.youtube.com/embed/xMOgmJ8roRE?si=GTbXDn54IhyuPfYC',
    },
    {
      name: 'Лондон против всех',
      album: miXXXtape_I.id,
      duration: '2:54',
      number: 12,
      youtube: 'https://www.youtube.com/embed/hWPiM4dg6ss?si=pDC0xStu2V_FsdPW',
    },
    {
      name: 'Чёртово колесо',
      album: miXXXtape_I.id,
      duration: '0:45',
      number: 21,
      youtube: 'https://www.youtube.com/embed/HUyAZANieF0?si=hNC_kUPZOv_HRn7F',
    },
    {
      name: 'Operation Payback',
      album: miXXXtape_I.id,
      duration: '4:12',
      number: 5,
      youtube: 'https://www.youtube.com/embed/3K8oJQuW2DU?si=0sizWGdTsKx0cQtC',
    },
    {
      name: 'Bukkake',
      album: miXXXtape_I.id,
      duration: '1:25',
      number: 33,
      youtube: 'https://www.youtube.com/embed/dVsJfQLv5l0?si=yEs-TLTqy6VWCYdE',
    },
    {
      name: 'Восточный Мордор',
      album: Eternal_Jew.id,
      duration: '2:49',
      number: 1,
      youtube: 'https://www.youtube.com/embed/EN3n8sW42Eo?si=GDZT6aCFqW8kUNkW',
    },
    {
      name: 'Судьба моралиста',
      album: Eternal_Jew.id,
      duration: '1:59',
      number: 9,
      youtube: 'https://www.youtube.com/embed/nvmDrD7iuZE?si=hRxMUvdeE4gS6YC7',
    },
    {
      name: 'В Говне',
      album: Eternal_Jew.id,
      duration: '2:30',
      number: 12,
      youtube: 'https://www.youtube.com/embed/4cDwuSSmttE?si=tMOXQDuU08mAs6Gb',
    },
    {
      name: 'Russky Cockney',
      album: Eternal_Jew.id,
      duration: '2:37',
      number: 11,
      youtube: 'https://www.youtube.com/embed/dM-pggWuC1k?si=4YVjORBCpLrqASJl',
    },
    {
      name: 'До сих пор MC',
      album: Eternal_Jew.id,
      duration: '3:24',
      number: 5,
      youtube: 'https://www.youtube.com/embed/7EWnP5QMwg4?si=W9iJTPaf4AOni_hj',
    },
    {
      name: 'Badman (feat. Global Elements)',
      album: Badman.id,
      duration: '3:05',
      number: 1,
      youtube: 'https://www.youtube.com/embed/__6uSvLJTZE?si=awnUR1UVwK-uB-Fa',
    },
    {
      name: 'Железный занавес',
      album: Balance.id,
      duration: '3:12',
      number: 1,
      youtube: 'https://www.youtube.com/embed/XqHpmz-sNO8?si=niJV8OqMoJOgWem8',
    },
    {
      name: 'Пока вы жевали куплеты',
      album: Balance.id,
      duration: '4:07',
      number: 7,
      youtube: 'https://www.youtube.com/embed/A4B1wXLtogM?si=XQCCBtbPvtc-OC1y',
    },
    {
      name: 'Растет Тариф',
      album: Dogolya.id,
      duration: '3:27',
      number: 3,
      youtube: 'https://www.youtube.com/embed/tgJpPrzRYfM?si=cTlCeWd13yrX7TsI&amp;start=477',
    },
    {
      name: 'SUNSET',
      album: Dogolya.id,
      duration: '4:08',
      number: 2,
      youtube: 'https://www.youtube.com/embed/tgJpPrzRYfM?si=cTlCeWd13yrX7TsI&amp;start=233',
    },
    {
      name: 'Жить',
      album: Dogolya.id,
      duration: '2:53',
      number: 8,
      youtube: 'https://www.youtube.com/embed/tgJpPrzRYfM?si=cTlCeWd13yrX7TsI&amp;start=1541',
    },
    {
      name: 'Али',
      album: Dogolya.id,
      duration: '3:55',
      number: 1,
      youtube: 'https://www.youtube.com/embed/tgJpPrzRYfM?si=cTlCeWd13yrX7TsI',
    },
    {
      name: 'Round 1 (vs. Экспайн)',
      album: KBCKMC.id,
      duration: '2:15',
      number: 1,
      youtube: 'https://www.youtube.com/embed/3ZNJPIqUM-8?si=nZrHIOukD-rwTeqQ&amp;start=145',
    },
    {
      name: 'Round 2 (vs. Экспайн)',
      album: KBCKMC.id,
      duration: '2:25',
      number: 3,
      youtube: 'https://www.youtube.com/embed/3ZNJPIqUM-8?si=nZrHIOukD-rwTeqQ&amp;start=451',
    },
    {
      name: 'Round 3 (vs. Экспайн)',
      album: KBCKMC.id,
      duration: '2:14',
      number: 6,
      youtube: 'https://www.youtube.com/embed/3ZNJPIqUM-8?si=nZrHIOukD-rwTeqQ&amp;start=763',
    },
    {
      name: 'ВЕСЕЛИТЬСЯ',
      album: THE_BOX.id,
      duration: '2:16',
      number: 1,
      youtube: 'https://www.youtube.com/embed/IHBsznDGyRQ?si=CQiG7_6KtrfMqA9g',
    },
    {
      name: 'BOX-SHAPED INTRO',
      album: THE_BOX.id,
      duration: '2:00',
      number: 2,
      youtube: 'https://www.youtube.com/embed/IHBsznDGyRQ?si=nxWKfNVPm2KkErvD&amp;start=136',
    },
    {
      name: 'Я НЕ ТЫ',
      album: THE_BOX.id,
      duration: '2:11',
      number: 3,
      youtube: 'https://www.youtube.com/embed/IHBsznDGyRQ?si=nxWKfNVPm2KkErvD&amp;start=256',
    },
    {
      name: 'HALF-LIFE',
      album: THE_BOX.id,
      duration: '2:32',
      number: 4,
      youtube: 'https://www.youtube.com/embed/IHBsznDGyRQ?si=nxWKfNVPm2KkErvD&amp;start=388',
    },
    {
      name: 'ДВЕ',
      album: THE_BOX.id,
      duration: '2:19',
      number: 5,
      youtube: 'https://www.youtube.com/embed/IHBsznDGyRQ?si=nxWKfNVPm2KkErvD&amp;start=541',
    },
    {
      name: 'А всша?',
      album: Other.id,
      duration: '1:28',
      number: 4,
      youtube: 'https://www.youtube.com/embed/e_Wyc9SCCEo?si=pQDHk6W2U3sMtgpK',
    },
    {
      name: 'Тульский пряник',
      album: Other.id,
      duration: '1:11',
      number: 7,
      youtube: 'https://www.youtube.com/embed/ktTrhQ6_6Vc?si=jvSDTgU-bPs_7DMT',
    },
  );

  await db.close();await db.close();
})().catch(console.error);