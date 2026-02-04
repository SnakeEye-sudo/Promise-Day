
import React from 'react';
import { Heart, Star, Shield, Gift, Handshake, Users, Flame } from 'lucide-react';
import { Vachan } from './types';

export const VACHANS: Vachan[] = [
  {
    id: 1,
    title: "प्रथम वचन: अटूट साथ",
    description: "मैं हमेशा तुम्हारा साथ निभाऊंगा, चाहे हालात कितने भी कठिन क्यों न हों। हर सुख-दुख में हम एक साथ खड़े होंगे।",
    icon: "Heart"
  },
  {
    id: 2,
    title: "द्वितीय वचन: खुशी और मुस्कान",
    description: "तुम्हारी खुशी ही मेरी सबसे बड़ी प्राथमिकता होगी। मैं पूरी कोशिश करूँगा कि तुम्हारी आँखों में कभी आँसू न आएँ।",
    icon: "Star"
  },
  {
    id: 3,
    title: "तृतीय वचन: सपनों का सहारा",
    description: "मैं तुम्हारे सपनों को पूरा करने में तुम्हारा सबसे बड़ा सहारा बनूँगा और हर कदम पर तुम्हें प्रोत्साहित करूँगा।",
    icon: "Shield"
  },
  {
    id: 4,
    title: "चतुर्थ वचन: सम्मान और विश्वास",
    description: "हम हमेशा एक-दूसरे का सम्मान करेंगे और हमारा विश्वास कभी नहीं टूटने देंगे। बिना किसी शर्त के मैं तुम पर भरोसा करूँगा।",
    icon: "Handshake"
  },
  {
    id: 5,
    title: "पंचम वचन: पारदर्शिता",
    description: "हर छोटी-बड़ी बात तुमसे साझा करूँगा और हमारे बीच कोई राज नहीं होगा। हमारी बातें सिर्फ हमारे बीच रहेंगी।",
    icon: "Gift"
  },
  {
    id: 6,
    title: "षष्ठम वचन: परिवार का प्रेम",
    description: "तुम्हारे परिवार को भी अपने परिवार जैसा मान और प्यार दूँगा। हम दोनों मिलकर एक सुखी दुनिया बनाएँगे।",
    icon: "Users"
  },
  {
    id: 7,
    title: "सप्तम वचन: अंतिम सांस तक",
    description: "जिंदगी के हर मोड़ पर, आखिरी सांस तक सिर्फ तुम्हारा हाथ थामे रहूँगा। मेरा प्रेम तुम्हारे लिए कभी कम नहीं होगा।",
    icon: "Flame"
  }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Heart: <Heart className="text-red-500" size={32} />,
  Star: <Star className="text-yellow-500" size={32} />,
  Shield: <Shield className="text-blue-500" size={32} />,
  Handshake: <Handshake className="text-green-500" size={32} />,
  Gift: <Gift className="text-purple-500" size={32} />,
  Users: <Users className="text-pink-500" size={32} />,
  Flame: <Flame className="text-orange-600" size={32} />
};
