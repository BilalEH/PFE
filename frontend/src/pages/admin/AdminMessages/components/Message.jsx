import React from "react";
import "../style/AdminMessages.css";

export default function Message({ message }) {
    function handleRefuseMsg() {
        console.log("ghyrha layrdi 3lik");
    }

    function handleAcceptMsg() {
        console.log("mrhba bik hh");
    }

    return (
        <>
            <div className="h-100">
                <div className="message-from text-muted">
                    From : Saad Dirassa
                </div>
                <div className="message-title">Message Title</div>
                <div className="message">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis reprehenderit ex facere impedit! Possimus nulla
                    aperiam voluptate ad quam dolor qui excepturi explicabo. Ad
                    tempore dolore facere et aliquam asperiores. Dignissimos
                    aliquam voluptate possimus assumenda? Assumenda odio dicta
                    ullam aperiam sed voluptate inventore corrupti veritatis
                    aliquam eligendi, at neque laborum perferendis! Repellendus
                    accusamus recusandae hic laudantium cumque maxime,
                    consectetur fuga. Modi officia praesentium numquam explicabo
                    at saepe nobis! Porro quas maiores libero blanditiis saepe
                    et repellat officiis, officia exercitationem sunt
                    perspiciatis dolorem, nam facere aspernatur! Minima tenetur
                    reprehenderit laboriosam similique? Delectus perspiciatis
                    repellat exercitationem ipsum amet! Possimus, officiis
                    inventore? Praesentium, ratione? Veritatis sed at ipsam
                    harum doloribus mollitia unde in blanditiis, illum vitae
                    sequi odio eius id! Ratione, nam distinctio. Pariatur nisi
                    facere nulla molestiae rem minima modi amet commodi
                    doloremque quia nesciunt, explicabo rerum ut illum ex
                    inventore dolorum delectus repellendus numquam eveniet
                    consectetur tempore. Id odit enim libero! Aliquid, doloribus
                    provident, sapiente totam cumque cupiditate placeat at
                    officiis quam libero magnam suscipit dolorem earum inventore
                    veritatis natus vel pariatur commodi maiores laudantium
                    dolore officia dolores! Velit, at doloremque! Veniam, porro
                    cumque reiciendis a, dolore nobis, aperiam maxime quia
                    laborum molestiae rem animi recusandae sunt quam dolor
                    explicabo! Autem dolore maxime veritatis blanditiis alias
                    fugit consectetur adipisci, accusantium laboriosam! Aperiam
                    assumenda suscipit vero, fuga laborum iusto hic cum facere
                    non? Nesciunt iure nihil, nemo repudiandae expedita repellat
                    eveniet, delectus enim minus asperiores maiores dolorem
                    laudantium voluptas modi dolorum voluptatum. Nisi quidem
                    deleniti molestias maiores accusamus facere aspernatur
                    pariatur, molestiae, officiis alias ratione deserunt harum.
                    Possimus deserunt harum ut laudantium iure quis odit
                    perspiciatis sapiente, temporibus rem facere atque? Ducimus?
                </div>
                <div className="message-btns d-flex align-items-center justify-content-evenly">
                    <button
                        onClick={() => handleRefuseMsg()}
                        className="refuse-msg-btn"
                    >
                        Refuse
                    </button>
                    <button
                        onClick={() => handleAcceptMsg()}
                        className="accept-msg-btn"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </>
    );
}
