"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FadeInSection from "@/components/ui/FadeInSection";
import profile from "@/data/profile.json";

const fallbackImage = {
  src: "/works/novelang-image1.png",
  alt: "Work preview",
};

type WorkItem = (typeof profile)["works"][number];

export default function Works() {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const works = profile.works as WorkItem[];

  const openWork = (work: WorkItem) => {
    setSelectedWork(work);
    setSelectedImageIndex(0);
  };

  const closeWork = () => {
    setSelectedWork(null);
    setSelectedImageIndex(0);
  };

  useEffect(() => {
    if (!selectedWork) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWork();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedWork]);

  const modalImages = selectedWork
    ? selectedWork.images.slice(0, 4).length > 0
      ? selectedWork.images.slice(0, 4)
      : [fallbackImage]
    : [];

  const activeImage =
    modalImages[selectedImageIndex] ?? modalImages[0] ?? fallbackImage;

  return (
    <>
      <section id="works" className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <FadeInSection>
            <h2 className="mb-12 text-center text-3xl font-bold text-white">
              Works
            </h2>
          </FadeInSection>

          <div className="grid gap-6 md:grid-cols-2">
            {works.map((work) => {
              const cardImage = work.images[0] ?? fallbackImage;

              return (
                <FadeInSection key={work.id}>
                  <button
                    type="button"
                    onClick={() => openWork(work)}
                    className="group h-full w-full rounded-2xl border border-dark-border bg-dark-card p-6 text-left transition-colors hover:border-teal-500/40"
                  >
                    <div className="mb-4 overflow-hidden rounded-xl border border-dark-border">
                      <Image
                        src={cardImage.src}
                        alt={cardImage.alt ?? `${work.title} thumbnail`}
                        width={1200}
                        height={675}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>

                    <div className="mb-4 flex justify-end">
                      <span className="text-xs text-gray-500 transition-colors group-hover:text-teal-300">
                        詳細を見る
                      </span>
                    </div>

                    <h3 className="mb-1 text-xl font-semibold text-white">
                      {work.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-400">{work.subtitle}</p>
                    <p className="mb-5 text-sm leading-relaxed text-gray-300">
                      {work.summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {work.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-dark-border px-2.5 py-1 text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </button>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {selectedWork && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-modal-title"
          onClick={closeWork}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-dark-border bg-dark-card p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full border border-dark-border p-2 text-gray-400 transition-colors hover:text-white"
              onClick={closeWork}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>

            <h3
              id="work-modal-title"
              className="mb-1 text-2xl font-bold text-white"
            >
              {selectedWork.title}
            </h3>
            <p className="mb-5 text-sm text-gray-400">{selectedWork.subtitle}</p>

            <div className="mb-4 overflow-hidden rounded-xl border border-dark-border">
              <Image
                src={activeImage.src}
                alt={activeImage.alt ?? `${selectedWork.title} preview`}
                width={1200}
                height={675}
                className="aspect-video w-full object-cover"
              />
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {modalImages.map((image, index) => (
                <button
                  key={`${selectedWork.id}-${image.src}-${index}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`${selectedWork.title} image ${index + 1}`}
                  className={`overflow-hidden rounded-lg border transition-colors ${
                    selectedImageIndex === index
                      ? "border-teal-400"
                      : "border-dark-border hover:border-teal-500/40"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt ?? `${selectedWork.title} thumbnail ${index + 1}`}
                    width={160}
                    height={90}
                    className="h-[56px] w-[92px] object-cover"
                  />
                </button>
              ))}
            </div>

            <p className="mb-6 text-sm leading-relaxed text-gray-300">
              {selectedWork.description}
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
              {selectedWork.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={selectedWork.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-300 transition-colors hover:bg-teal-500/20"
            >
              作品へ移動
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h4m0 0v4m0-4l-8 8m-4-4v6h6"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
