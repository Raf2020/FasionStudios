import { Fragment } from "react";
import { BodyCell, HeaderCell, TableCell } from "../table-cells";
import { Subscriber } from "@/types/subscribe.type";

type SubscribersTableProps = {
  subscribers: Subscriber[];
  onCheckClick: (bookingId: string) => void;
};

const SubscribersTable = ({
  subscribers,
  onCheckClick,
}: SubscribersTableProps) => {
  return (
    <div className="grid w-full pt-2 px-2 grid-cols-3 shadow-md">
      <Fragment>
        <HeaderCell label="Select" left />
        <HeaderCell label="Email" />
        <HeaderCell label="Subscribed" />
      </Fragment>
      {subscribers.map((subscriber) => (
        <Fragment key={subscriber.email}>
          <TableCell left>
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={subscriber.selected}
              onClick={() => onCheckClick(subscriber.email)}
            />
          </TableCell>
          <BodyCell label={subscriber.email} />
          <BodyCell
            label={new Date(subscriber.createdAt).toLocaleDateString()}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default SubscribersTable;
