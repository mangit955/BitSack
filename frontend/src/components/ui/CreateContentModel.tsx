import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./inputbox";
import axios from "axios";
import { BACKEND_URL } from "../../config";

//enum like object, since enums cannot be used while enabling the erasableSyntaxOnly.
const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;
type ContentType = (typeof ContentType)[keyof typeof ContentType];

export function CreateContentModel({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      BACKEND_URL + "/api/v1/Content",
      {
        link,
        type,
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    onClose();
  }

  return (
    <div>
      {open && (
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-slate-700 opacity-60 " />
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="flex flex-col justify-center">
              <span className="bg-white  p-4 rounded-xl shadow-xl w-full max-w-md   ">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input ref={titleRef} placeholder="Title" />
                  <Input ref={linkRef} placeholder="Link" />
                </div>
                <div>
                  <h1>Type</h1>
                  <div className="flex justify-center  gap-1 p-2">
                    <Button
                      text="Youtube"
                      size="md"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Youtube);
                      }}
                    ></Button>
                    <Button
                      text="Twitter"
                      size="md"
                      variant={
                        type === ContentType.Twitter ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Twitter);
                      }}
                    ></Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Submit"
                    size="md"
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
