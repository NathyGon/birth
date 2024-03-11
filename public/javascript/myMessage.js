const months = {
  LABEL: [
    'JUNE',
    'JULY',
    'AUGUST',
    'NOVEMBER',
    'DECEMBER',
    'JANUARY',
    'FEBRUARY',
  ],
  AUDIO: [
    '/audio/day.mp3',
    '/audio/night.mp3',
    '/audio/halloween.mp3',
    '/audio/birth.mp3',
    '/audio/christmas.mp3',
  ],
  CSS_NAME: ['day', 'night', 'day', 'halloween', 'christmas', 'day', 'night'],
  //change this
  VIDEO_STAMPS: [
    { start: 0, end: 41 }, //june // 41
    { start: 43, end: 1 * 60 + 4 }, // july
    { start: 1 * 60 + 5, end: 1 * 60 + 29 }, // august
    { start: 1 * 60 + 30, end: 1 * 60 + 51 },
    { start: 1 * 60 + 53, end: 2 * 60 + 12 },
    { start: 2 * 60 + 13, end: 2 * 60 + 43 },
    { start: 2 * 60 + 44, end: 2 * 60 + 59 },
  ],

  //change this
  MESSAGE: [
    `It was June the month we met, I wouldn't think that we would get this far. This all where it started. I remember the time we talked to each other and how fun it was and I was amazed that you are unique to the ones that i've been talking to. 
We have talked  a lot and we have fun in doing so. Thought. I wouldn't go further if I didn't find you attractive AHAHAHA Anyways, enjoy keep moving forward :)`,
    `It was the month of july when we started to get to know each other. I started trusting you and share everything what I can, you didn't get bored or anything you just listen to me a lot. Thought you keep listening but you wouldn't share anything to me  I figured you don't trust me at that time. That what was the time that I know that you were amazing. So, keep going we have a long way to go.`,
    `August, after a while and talking to each other on a daily basis. We become best of friends you started slowly trusting me and tried to be understanding. You helped me practice a lot of stuff and even let me teach you. It was becoming inevitable.`,
    `November, I estimated that you trust me 90% at this time. We played a lot of games, different kinds of games. We almost do anything together. Though, It's not really kinda healthy. We both keep wanting to grow better and and be healthy.`,
    `Wow, it is already december. AHAHAHA we known each other for months now. You helped me a lot during this time I was happy and not lonely, I was able to enjoy christmas with you.  I hope we have christmas together this year.`,
    `Happy new year, I was not expecting a long message coming from you. I was shocked and caught me by suprise. It seems that I underestimated you. AHAHHAH. Though, wait until you see this. I almost forgot we fought this month right?`,
    `This is my final message.`,
  ],
};
const bdayMessage = `Just kidding, AHAHAHAHA Again soupriceeeeee!!! Caught you again. Please talk to the cat in the middle. That was suppose to be me but I dont have enough time making this and you becoming too suspecious about me not talking to you lmao.`;

const collection_of_messages = {
  0: {
    sender: '-Althea',
    data: `HAPPIEST BIRTHDAY ATE VON!❤️ THE VERY MAKULIT NA ATE.  I hope your special day is filled with love, laughter, and lots of cake! 🍰🎁 Sending you my warmest wishes for a fantastic year ahead. May this new year of your life bring you happiness, success, and unforgettable memories. Enjoy your day to the fullest! 🎁🎉 Happy birthday ate von!🎈😚`,
    title: 'Ate Von',
    type: 'text',
  },
  1: {
    sender: '-Chary',
    data: `DEAR ATE VON HAPPY BIRTHDAY VON ANGELA TRANSGENDER!!!! HAHAHAHAHAH, JOKE. BITAW HAPPY BIRTHDAY TE HEHEHE, IF MAG TELL PAKO SA AKONG FIRST IMPRESSIONS SA IMO I THINK UNA NAKO NA THINK KAY "WEIRDO KAAYO NI NA BAE" HAHAHAHAHAHA, MAO JUD NI UNA NAKO NA IMPRESSIONS SA IMO LABI NA PAG MAG ISTORYA KA NA IKAW RA ISA NAKA HUNA-HUNA BIYA JUD KO NA "DAKU KAAYO NIG DEPERENSYA SA UTOK" HAHAHAHHAHA BITAW TE NO OFFENSE MEANT HA HAHAHAHAHA. TAPOS NA DUGAY NA ACCEPT NA NAKO ANG IMONG PAG KA TAO HAHAHAHAHAHA. BITAW TE HAPPY BIRTHDAY WALA KOY MA INGON NGA SWEET WORDS FOR YOU TUNGOD DI KO KABALO ANA HAHAHAHAHA, ANG IMPORTANTE BUHI KA WA PAKA GI KUHA NI LORD HAHAHHAHAHA. HAPPY BIRTHDAY TE ENJOY YOUR DAY!!!  
    PS. SORRY SA PAG LIE ABOUT KONG NI REPLY NA BA SYA, GUSTO LANG NAMO NI ALTHEA MO TABANG SA PAG SURPRISE NIYA SA IMO, DI NIMO E INGON PERO GI KILIG NA JUD KA TO THE BONES HAHAHHAHAHA.`,
    title: 'Ate Von',
    type: 'text',
  },
  2: {
    sender: '-Nathaniel',
    data: `Inaabangan mo ba sakin? AHAHAHAHAH. Happy Birthday, Gela. You're the best I want to make you special by creating this kinda look simple website but it is really hard.
    You're being too suspecious and I know you wouldn't expect me to do this. I really hope you get what you want in the future. Always remember to pray AHAHAH
    djoke bakit ako nag sasalita sa english. Again, maligyang araw. pinapadami ko lng to para mukhang madami. Ikaw ang best pati unique sa lahat ng nakilala ko iniisip ko 
    na baka piniplease mo lng ako. Pero mabait ka pala talaga. Di ko lng sinasabi kasi lalaki ulo mo. More birthday to come. I really hope this made you feel special. 
    Salamat sa lahat ng ginawa mo sakin kahit di ko na alam ginagawa ko, di ko na naiintindihan sarili ko. andyan ka parin. kahit right now at my lowest point you keep 
    being understanding, I Hope mag bago ka what I mean I hope mag bago ka pa in a healthy way syempre ako rin. Enjoy your day. AHAHAHA. godbless and goodluck. Wala na akong masabi di ako magaling sa ganto. pero after nito libre kita hehehe. pag tumangi ka di kita bati.
this is my way of showing how I appreciate everything you done for me so far. I really hope that we can get to know more each other *wink* wink*. WALAAA NA oks na yan. `,
    title: 'VonGela',
    type: 'text',
  },
  3: {
    sender: '-VonGela',
    data: '/images/personal/1.jpg',
    title: 'Happy Birthday!',
    type: 'image',
  },
  4: {
    sender: '-Von',
    data: '/images/personal/2.jpg',
    title: 'Happy Birthday!',
    type: 'image',
  },
  5: {
    sender: '-Hanabi',
    data: '/images/personal/3.jpg',
    title: 'Happy Birthday!',
    type: 'image',
  },
  6: {
    sender: '-Aniel pogi',
    data: 'Chary and Althea. Di kami bati ni aquote. HMPPP.',
    title: 'Thanks!!!',
    type: 'text',
  },
};
