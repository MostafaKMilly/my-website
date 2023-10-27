export const createOgImage = ({ title, meta }: { title: string; meta: string }) =>
  [
    // ACCOUNT PREFIX
    // Add your own Cloudinary account ID.
    `https://res.cloudinary.com/ds9a7nckr/image/upload`,
    // Composed Image Transformations
    `w_1600,h_836,q_100`,
    // TITLE
    // Karla google font in light rose
    `l_text:Ubuntu_92_bold:${e(title)},co_rgb:FFFFFF,c_fit,w_1200,h_400`,
    // Positioning
    `fl_layer_apply,g_south_west,x_100,y_340`,
    // META
    // Karla, but smaller
    `l_text:Ubuntu_52_bold:${e(meta)},co_rgb:FFFFFF80,c_fit,w_1400`,
    // Positioning
    `fl_layer_apply,g_south_west,x_100,y_100`,
    // IMAGE
    `Frame_1_g3ty71.png`,
  ].join('/');

// double escape for commas and slashes
const e = (str: string) => encodeURIComponent(encodeURIComponent(str));
