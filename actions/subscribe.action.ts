import db from "@/lib/firestore";
import { Subscriber } from "@/types/subscribe.type";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const addSubscriber = async (subscriber: Subscriber) => {
  try {
    const docRef = doc(db, "subscribers", subscriber.email);
    await setDoc(docRef, subscriber);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const getAllSubscribers = async () => {
  try {
    const collectionRef = collection(db, "subscribers");
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => doc.data() as Subscriber);
  } catch (error) {
    return [];
  }
};

export const downloadSubscriberList = (subscribers: Subscriber[]) => {
  const csvHeader = "Email,Subscribed\n";
  const csvRows = subscribers
    .map(
      (subscriber) =>
        `${subscriber.email},${new Date(
          subscriber.createdAt
        ).toLocaleDateString()}`
    )
    .join("\n");
  const csvData = csvHeader + csvRows;

  const blob = new Blob([`\ufeff${csvData}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const aTag = document.createElement("a");
  aTag.href = url;
  aTag.download = "subscriber-list.csv";

  document.body.appendChild(aTag);
  aTag.click();

  document.body.removeChild(aTag);
  URL.revokeObjectURL(url);
};
