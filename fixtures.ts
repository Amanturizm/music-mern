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

  const [Oxxxymiron, R1Fmabes, MC_No_Limit, Diktator_UAV, KnownAim] = await Artist.create(
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
      info: 'KnownAim, также ранее известный как Niki-Tiki-Tavi (Никита Дмитриевич Гашников) — рэп-исполнитель, баттл-МС, участник SLOVO: Saint-Petersburg (1 сезон), участник 140 BPM Cup (1 сезон).',
    },
  );

  const [miXXXtape_I, Eternal_Jew, Badman, Balance, Dogolya, KBCKMC] = await Album.create(
    {
      name: 'miXXXtape I',
      artist: Oxxxymiron.id,
      date: 2012,
      image: 'fixtures/mixxxtape1.jpg',
    },
    {
      name: 'Eternal Jew',
      artist: Oxxxymiron.id,
      date: 2011,
      image: 'fixtures/eternal_jew.png',
    },
    {
      name: 'Badman',
      artist: MC_No_Limit.id,
      date: 2017,
      image: 'fixtures/badman.jpg',
    },
    {
      name: 'Баланс',
      artist: Diktator_UAV.id,
      date: 2021,
      image: 'fixtures/balance.jpg',
    },
    {
      name: 'Доголя',
      artist: KnownAim.id,
      date: 2018,
      image: 'fixtures/dogolya.jpeg',
    },
    {
      name: 'КУБОК МЦ:11(Autotune Battle)',
      artist: KnownAim.id,
      date: 2022,
      image: 'fixtures/kbckmcexpainvsknownaim.jpeg',
    },
  );

  await Track.create(
    {
      name: 'Мой менталитет',
      album: miXXXtape_I.id,
      duration: '2:56',
      number: 20,
    },
    {
      name: 'Лондон против всех',
      album: miXXXtape_I.id,
      duration: '2:54',
      number: 12,
    },
    {
      name: 'Чёртово колесо',
      album: miXXXtape_I.id,
      duration: '0:45',
      number: 21,
    },
    {
      name: 'Operation Payback',
      album: miXXXtape_I.id,
      duration: '4:12',
      number: 5,
    },
    {
      name: 'Bukkake',
      album: miXXXtape_I.id,
      duration: '1:25',
      number: 33,
    },
    {
      name: 'Восточный Мордор',
      album: Eternal_Jew.id,
      duration: '2:49',
      number: 1,
    },
    {
      name: 'Судьба моралиста',
      album: Eternal_Jew.id,
      duration: '1:59',
      number: 9,
    },
    {
      name: 'В Говне',
      album: Eternal_Jew.id,
      duration: '2:30',
      number: 12,
    },
    {
      name: 'Russky Cockney',
      album: Eternal_Jew.id,
      duration: '2:37',
      number: 11,
    },
    {
      name: 'До сих пор MC',
      album: Eternal_Jew.id,
      duration: '3:24',
      number: 5,
    },
    {
      name: 'Badman (feat. Global Elements)',
      album: Badman.id,
      duration: '3:05',
      number: 1,
    },
    {
      name: 'Железный занавес',
      album: Balance.id,
      duration: '3:12',
      number: 1,
    },
    {
      name: 'Пока вы жевали куплеты',
      album: Balance.id,
      duration: '4:07',
      number: 7,
    },
    {
      name: 'Растет Тариф',
      album: Dogolya.id,
      duration: '3:27',
      number: 3,
    },
    {
      name: 'SUNSET',
      album: Dogolya.id,
      duration: '4:08',
      number: 2,
    },
    {
      name: 'Жить',
      album: Dogolya.id,
      duration: '2:53',
      number: 8,
    },
    {
      name: 'Али',
      album: Dogolya.id,
      duration: '3:55',
      number: 1,
    },
    {
      name: 'Round 1 (vs. Экспайн)',
      album: KBCKMC.id,
      duration: '2:15',
      number: 1,
    },
    {
      name: 'Round 2 (vs. Экспайн)',
      album: KBCKMC.id,
      duration: '2:25',
      number: 3,
    },
    {
      name: 'Round 3 (vs. Экспайн)',
      album: KBCKMC.id,
      duration: '2:14',
      number: 6,
    }
  );

  await db.close();await db.close();
})().catch(console.error);