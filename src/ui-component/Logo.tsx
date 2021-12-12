// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Berry" width="100" />
         *
         */
        <svg width="60" height="60" viewBox="0 0 123 123" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100.91 0.271729H21.17C9.5058 0.271729 0.0500488 9.72747 0.0500488 21.3917V101.132C0.0500488 112.796 9.5058 122.252 21.17 122.252H100.91C112.574 122.252 122.03 112.796 122.03 101.132V21.3917C122.03 9.72747 112.574 0.271729 100.91 0.271729Z" fill="#231F20" />
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="123" height="123">
                <path d="M100.91 0.271729H21.17C9.5058 0.271729 0.0500488 9.72747 0.0500488 21.3917V101.132C0.0500488 112.796 9.5058 122.252 21.17 122.252H100.91C112.574 122.252 122.03 112.796 122.03 101.132V21.3917C122.03 9.72747 112.574 0.271729 100.91 0.271729Z" fill="#231F20" />
            </mask>
            <g mask="url(#mask0)">
                <path d="M116.43 -3.9984C116.43 -5.2684 -2.57007 122.162 -2.57007 122.162V-9.1084C-2.57007 -9.1084 116.43 -2.7284 116.43 -3.9984Z" fill="#414042" />
            </g>
            <path d="M23.2604 44.4516C23.1912 44.5016 23.1176 44.5451 23.0404 44.5816C22.6672 44.8696 22.2117 45.0308 21.7404 45.0416C21.1069 45.0147 20.4879 44.8437 19.9304 44.5416C19.0731 44.0835 18.2935 43.4929 17.6204 42.7916C16.7763 41.9755 16.0403 41.0547 15.4304 40.0516C14.3224 38.2374 13.6864 36.1747 13.5804 34.0516C13.5296 33.1579 13.6104 32.2617 13.8204 31.3916C14.0173 30.5896 14.3094 29.8141 14.6904 29.0816C15.0432 28.395 15.5136 27.7756 16.0804 27.2516C16.495 26.9004 16.9603 26.6139 17.4604 26.4016C17.8971 26.2054 18.3577 26.0676 18.8304 25.9916C19.9901 25.8322 21.1635 25.7987 22.3304 25.8916C23.599 25.9745 24.8375 26.3147 25.9704 26.8916C29.3037 28.6716 30.8271 31.7682 30.5404 36.1816C30.382 38.1897 29.979 40.1711 29.3404 42.0816C28.6904 44.0816 28.0104 46.0816 27.3404 47.9516C26.9604 48.9916 26.6271 49.9916 26.3404 50.9516C26.0537 51.9116 25.7937 52.7916 25.5604 53.5916C25.3678 54.298 25.2439 55.0213 25.1904 55.7516C25.1201 56.2751 25.2182 56.8074 25.4704 57.2716C25.5482 57.4478 25.6684 57.602 25.8201 57.7206C25.9719 57.8393 26.1506 57.9186 26.3404 57.9516C26.7175 57.988 27.0969 57.9114 27.4304 57.7316C27.8619 57.5053 28.2592 57.2192 28.6104 56.8816C29.0073 56.5082 29.3845 56.1143 29.7404 55.7016C30.0904 55.3016 30.4104 54.9016 30.7404 54.5116L31.4404 53.5116C32.567 51.7103 33.5661 49.8324 34.4304 47.8916C35.3971 45.7849 36.3471 43.6416 37.2804 41.4616C37.9504 39.9216 38.6104 38.4616 39.2804 36.9716C39.9504 35.4816 40.5804 34.1816 41.2804 32.9716C41.863 31.8609 42.5317 30.7977 43.2804 29.7916C43.8642 28.9917 44.5814 28.2982 45.4004 27.7416C45.7225 27.5592 46.0566 27.3988 46.4004 27.2616C46.8565 27.0999 47.3543 27.0999 47.8104 27.2616C48.1176 27.3577 48.4129 27.4885 48.6904 27.6516L48.4704 28.0416C48.2439 27.8863 47.9941 27.7681 47.7304 27.6916C47.3398 27.5687 46.921 27.5687 46.5304 27.6916C46.221 27.7988 45.9229 27.9361 45.6404 28.1016C44.8586 28.6421 44.181 29.3197 43.6404 30.1016C42.8902 31.0997 42.2214 32.1564 41.6404 33.2616C41.0004 34.4616 40.3504 35.7816 39.7004 37.2616C39.0504 38.7416 38.4004 40.1816 37.7604 41.6916C36.8304 43.8716 35.8704 46.0216 34.9004 48.1616C34.0145 50.1368 32.9747 52.0394 31.7904 53.8516C30.8611 55.3645 29.6611 56.6933 28.2504 57.7716C27.765 58.1418 27.2297 58.4414 26.6604 58.6616C26.0993 58.9261 25.4789 59.0398 24.8604 58.9916L24.4304 58.8916C24.3139 58.8819 24.1969 58.8819 24.0804 58.8916C23.7465 58.8649 23.4234 58.7607 23.1369 58.587C22.8505 58.4134 22.6085 58.1753 22.4304 57.8916C21.9304 57.0816 21.9204 55.7716 22.3804 53.9716C22.6036 53.0516 22.874 52.1437 23.1904 51.2516C23.5204 50.2516 23.8804 49.2516 24.2604 48.1716C24.7204 46.9216 25.1804 45.6216 25.6304 44.2716C26.0804 42.9216 26.4604 41.5816 26.7804 40.2716C27.0925 38.9821 27.3131 37.6721 27.4404 36.3516C27.5594 35.1493 27.4988 33.936 27.2604 32.7516C27.0384 31.6459 26.5852 30.5997 25.9304 29.6816C25.2088 28.6913 24.263 27.886 23.1704 27.3316C21.98 26.6464 20.6093 26.3394 19.2404 26.4516C18.777 26.4967 18.3224 26.6078 17.8904 26.7816C17.364 26.9956 16.8772 27.2964 16.4504 27.6716C15.9015 28.1791 15.4448 28.778 15.1004 29.4416C14.2424 31.0822 13.8942 32.9417 14.1004 34.7816C14.1834 35.7614 14.3814 36.728 14.6904 37.6616C15.0218 38.5878 15.4509 39.4762 15.9704 40.3116C16.5035 41.1976 17.1488 42.011 17.8904 42.7316C18.4743 43.3361 19.1491 43.8456 19.8904 44.2416C20.4142 44.5262 20.995 44.6902 21.5904 44.7216C22.0239 44.7371 22.4489 44.5989 22.7904 44.3316C22.8167 44.2716 22.8625 44.2222 22.9204 44.1916L23.2604 44.4516Z" fill="white" />
            <path d="M65.6707 46.8917C65.7573 47.0117 65.7573 47.1117 65.6707 47.1917C63.9921 49.1167 61.8665 50.6001 59.4807 51.5117C57.941 52.1628 56.243 52.3437 54.6007 52.0317C53.6575 53.5016 52.4008 54.7446 50.9207 55.6717C49.5429 56.6656 47.8672 57.1594 46.1707 57.0717C45.4946 57.0514 44.8295 56.8959 44.2146 56.6142C43.5997 56.3325 43.0475 55.9304 42.5907 55.4317C41.6642 54.2136 41.1337 52.7407 41.0707 51.2117C40.8923 49.3108 41.3762 47.4066 42.4407 45.8217C43.5407 44.095 44.6173 43.165 45.6707 43.0317C46.7096 42.8967 47.7617 42.8967 48.8007 43.0317C49.5007 40.5917 50.8007 39.3217 52.7307 39.2017C53.3548 39.1192 53.989 39.2351 54.5436 39.533C55.0981 39.8309 55.5449 40.2957 55.8207 40.8617C56.4897 41.8448 56.8896 42.986 56.9807 44.1717C56.9692 45.2886 56.7906 46.3976 56.4507 47.4617C56.099 48.6773 55.6543 49.8642 55.1207 51.0117C55.844 51.4558 56.7026 51.6261 57.5407 51.4917C58.5019 51.3623 59.4367 51.0821 60.3107 50.6617C61.2793 50.2089 62.1921 49.6451 63.0307 48.9817C63.8621 48.356 64.6292 47.6492 65.3207 46.8717C65.3427 46.8458 65.3704 46.8254 65.4016 46.8121C65.4329 46.7987 65.4667 46.7928 65.5006 46.7947C65.5345 46.7967 65.5675 46.8064 65.597 46.8233C65.6265 46.8401 65.6517 46.8635 65.6707 46.8917ZM54.1707 51.9517C52.6704 51.5066 51.3547 50.5873 50.4207 49.3317C49.4929 47.975 48.9503 46.3922 48.8507 44.7517L48.7607 43.5317C48.1782 43.7138 47.6405 44.0162 47.1823 44.4193C46.7241 44.8224 46.3556 45.3172 46.1007 45.8717C45.339 47.2196 44.8243 48.6927 44.5807 50.2217C44.3036 51.4386 44.3242 52.7044 44.6407 53.9117C44.854 54.6543 45.3257 55.2962 45.9707 55.7217C46.5817 56.0533 47.2921 56.1528 47.9707 56.0017C49.0214 55.7426 50.0311 55.3387 50.9707 54.8017C52.2526 54.1251 53.3508 53.147 54.1707 51.9517ZM55.0407 41.1417C54.7184 40.7769 54.2695 40.5482 53.785 40.5018C53.3004 40.4554 52.8164 40.5947 52.4307 40.8917C51.6107 41.4917 51.2807 42.7717 51.4307 44.7517C51.5497 46.0063 51.9459 47.2188 52.5907 48.3017C53.1457 49.2526 53.8593 50.1015 54.7007 50.8117C55.2292 49.6918 55.6673 48.5314 56.0107 47.3417C56.357 46.2158 56.4459 45.0265 56.2707 43.8617C56.1664 42.8456 55.7347 41.891 55.0407 41.1417Z" fill="white" />
            <path d="M68.1998 45.8917C67.9098 46.5617 67.6498 47.2417 67.4198 47.9417C66.8332 49.4817 65.4998 52.895 63.4198 58.1816C62.5798 60.6816 62.3698 62.375 62.7898 63.2616C63.2098 64.1516 64.0098 64.1816 65.2098 63.3716C66.1565 62.705 68.0798 60.0383 70.9798 55.3716C73.8798 50.705 75.6465 47.835 76.2798 46.7616C76.3598 46.6216 76.4698 46.6016 76.5798 46.7616C76.6898 46.9216 76.7598 46.9516 76.6698 47.0616C76.0565 48.055 74.2465 50.9617 71.2398 55.7817C68.2331 60.6017 66.2331 63.335 65.2398 63.9816C64.5376 64.4846 63.703 64.7698 62.8398 64.8017C62.4536 64.8 62.0708 64.7288 61.7098 64.5916C61.3304 64.4067 61.0003 64.1344 60.7465 63.7972C60.4928 63.46 60.3225 63.0674 60.2498 62.6516C60.0059 61.3857 60.0434 60.0815 60.3598 58.8317C62.3598 53.0183 63.6931 49.1983 64.3598 47.3716C64.5698 46.6416 64.7998 45.9316 65.0598 45.2316C65.8698 42.7916 66.6498 40.4417 67.3698 38.1716C67.8398 36.8717 68.2898 35.5617 68.7198 34.2517C67.8498 34.4217 67.0398 34.5717 66.2798 34.6917C65.5143 34.7979 64.7427 34.8546 63.9698 34.8617C63.1657 34.9157 62.3632 34.7351 61.6598 34.3416C61.3943 34.2026 61.1697 33.9966 61.0083 33.744C60.847 33.4914 60.7544 33.201 60.7398 32.9017C60.7398 32.7217 60.7398 32.6517 60.8698 32.6817C60.9998 32.7117 61.1398 32.9617 61.3998 33.4216C61.5163 33.6438 61.6825 33.8361 61.8854 33.9835C62.0883 34.1309 62.3225 34.2295 62.5698 34.2716C63.0308 34.3648 63.4995 34.415 63.9698 34.4216C64.7727 34.4179 65.5744 34.3611 66.3698 34.2517C67.1798 34.1317 68.0298 33.9716 68.8998 33.7716C69.0665 33.365 69.2265 32.945 69.3798 32.5117C70.0398 30.6517 70.7098 28.8517 71.3798 27.1217C71.9863 25.4967 72.6772 23.9045 73.4498 22.3516C74.0923 21.0521 74.8136 19.7931 75.6098 18.5817C76.1681 17.6912 76.8405 16.8776 77.6098 16.1616C78.1499 15.6456 78.8631 15.3497 79.6098 15.3317C79.8969 15.3205 80.1808 15.3955 80.4249 15.5469C80.6691 15.6984 80.8623 15.9195 80.9798 16.1817C81.2746 16.9457 81.3507 17.7767 81.1998 18.5817C81.0254 19.7933 80.7237 20.9832 80.2998 22.1316C79.8398 23.465 79.2532 24.9183 78.5398 26.4916C77.8265 28.065 77.0198 29.7316 76.1198 31.4916L75.6798 32.3617L80.1298 31.3617C81.4437 31.0682 82.7838 30.9074 84.1298 30.8816C85.1016 30.8365 86.0536 31.1658 86.7898 31.8017C86.9485 31.9639 87.0862 32.1453 87.1998 32.3416C87.2966 32.4898 87.3708 32.6516 87.4198 32.8217C87.4296 32.8627 87.4237 32.9059 87.4034 32.9429C87.383 32.9798 87.3497 33.0079 87.3098 33.0216C87.2198 33.0216 87.0398 32.8617 86.7698 32.4717C86.5192 32.1033 86.1737 31.8096 85.7698 31.6217C85.5224 31.5292 85.2683 31.4557 85.0098 31.4017C84.7294 31.3498 84.445 31.323 84.1598 31.3217C82.7787 31.3504 81.4044 31.5247 80.0598 31.8416C78.5498 32.1616 77.0098 32.4916 75.4398 32.8416C74.7698 34.1216 74.0898 35.4117 73.3898 36.7217C72.3898 38.4617 71.4998 40.1817 70.5998 41.8617C69.6798 43.2617 68.8998 44.6217 68.1998 45.8917ZM71.0798 33.8917C70.9598 34.3317 70.8398 34.7516 70.7298 35.1616C70.2898 36.8416 69.8398 38.5483 69.3798 40.2817C68.9098 42.0117 68.4798 43.6517 68.0698 45.2217L70.6798 40.6017C71.5898 39.0117 72.4698 37.3817 73.3398 35.7217C73.8398 34.7917 74.3398 33.8816 74.7798 32.9816C72.6898 33.4816 71.4298 33.7917 71.0798 33.8917ZM79.5798 15.9816C79.3139 15.9661 79.048 16.0112 78.802 16.1134C78.556 16.2156 78.3364 16.3723 78.1598 16.5717C77.5724 17.1632 77.0738 17.8369 76.6798 18.5717C76.1192 19.5658 75.6151 20.5908 75.1698 21.6417C74.6798 22.8117 74.1698 24.1216 73.6698 25.5916C73.1698 27.0616 72.6698 28.5916 72.1698 30.2316C71.8498 31.2316 71.5298 32.2917 71.1698 33.3717L72.4298 33.0616L74.9998 32.4516C75.2898 31.9316 75.5498 31.4516 75.7898 30.8816C76.5698 29.315 77.2798 27.8117 77.9198 26.3717C78.5598 24.9317 79.1098 23.5917 79.5598 22.3717C79.9555 21.307 80.2697 20.2139 80.4998 19.1016C80.6659 18.3777 80.6659 17.6256 80.4998 16.9017C80.4595 16.6734 80.3493 16.4633 80.1845 16.3003C80.0198 16.1374 79.8085 16.0295 79.5798 15.9916V15.9816Z" fill="white" />
            <path d="M84.8907 47.1116C84.8414 47.1635 84.7978 47.2205 84.7607 47.2816C84.6207 47.5416 84.4707 47.8316 84.3307 48.1516C84.0707 48.765 82.8707 51.345 80.7307 55.8916C78.5907 60.4383 77.4907 63.3383 77.4307 64.5916C77.3607 65.8416 77.5807 66.5916 78.1007 66.8116C78.6207 67.0316 79.1607 66.8116 79.9807 66.2216C81.0187 65.4305 81.9409 64.4982 82.7207 63.4516C84.5551 61.0606 86.2256 58.5482 87.7207 55.9316C89.8207 52.405 91.324 49.9016 92.2307 48.4216C92.369 48.133 92.5294 47.8555 92.7107 47.5916C92.8807 47.3316 93.0407 47.0616 93.1807 46.8016C93.2407 46.6916 93.3407 46.6716 93.4907 46.8016C93.6407 46.9316 93.6207 46.9616 93.4907 47.1016L92.4907 48.6716L88.0907 56.1716C86.6119 58.8046 84.9407 61.3248 83.0907 63.7116C82.6907 64.2016 82.2607 64.7116 81.8107 65.2116C81.3754 65.7031 80.9004 66.1579 80.3907 66.5716C79.9127 66.9525 79.3844 67.2655 78.8207 67.5016C78.2858 67.7328 77.6968 67.809 77.1207 67.7216C76.8089 67.6958 76.5055 67.6072 76.2288 67.4612C75.9522 67.3151 75.7079 67.1146 75.5107 66.8716C75.1042 66.3259 74.8551 65.6791 74.7907 65.0016C74.6945 64.0985 74.7247 63.1864 74.8807 62.2916C75.0407 61.2583 76.1007 58.6283 78.0607 54.4016C80.0207 50.175 81.1174 47.8583 81.3507 47.4516C81.0475 47.5103 80.7395 47.5405 80.4307 47.5416H79.6107C78.6449 47.5728 77.6818 47.4236 76.7707 47.1016C76.141 46.9308 75.5669 46.5981 75.1056 46.1368C74.6442 45.6754 74.3116 45.1013 74.1407 44.4716C73.8089 43.6367 73.8089 42.7066 74.1407 41.8716C74.246 41.6898 74.3902 41.5336 74.5632 41.4143C74.7361 41.295 74.9334 41.2155 75.1407 41.1816C75.5073 41.1828 75.8616 41.3139 76.1407 41.5516C76.5594 42.0322 76.8516 42.6096 76.9907 43.2316C77.2648 44.1819 77.194 45.1986 76.7907 46.1016C77.3885 46.682 78.1701 47.0356 79.0007 47.1016C79.8362 47.1612 80.6759 47.1176 81.5007 46.9716L81.5907 46.8016L81.9407 46.1016L84.8907 47.1116ZM76.4807 42.7116C76.2207 42.2716 76.0307 42.1216 75.9107 42.2716C75.782 42.4671 75.6999 42.6895 75.6707 42.9216C75.6396 43.377 75.6699 43.8344 75.7607 44.2816C75.8812 44.9236 76.1952 45.5134 76.6607 45.9716C76.8616 45.4462 76.9495 44.8842 76.9185 44.3224C76.8874 43.7607 76.7383 43.2118 76.4807 42.7116Z" fill="white" />
            <path d="M95.31 46.1116C95.54 46.1616 95.77 46.2116 96.01 46.2416C96.9463 46.4384 97.9058 46.5023 98.86 46.4316C99.7499 46.3895 100.587 45.9978 101.19 45.3416C101.479 45.0533 101.702 44.7051 101.842 44.3216C101.982 43.938 102.036 43.5283 102 43.1216C101.93 42.2916 101.76 41.8416 101.5 41.7716C101.317 41.7621 101.134 41.79 100.962 41.8537C100.79 41.9173 100.633 42.0152 100.5 42.1416C99.8731 42.6514 99.2971 43.2207 98.78 43.8416C98.0821 44.6311 97.4904 45.5086 97.02 46.4516C96.61 47.2716 96.22 48.0916 95.86 48.9216C95.5 49.7516 95.17 50.5816 94.86 51.4216L94.64 52.1616C94.3872 52.998 94.2624 53.8678 94.27 54.7416C94.2381 55.4427 94.4119 56.1379 94.77 56.7416C95.1034 57.2125 95.6043 57.5381 96.17 57.6516C96.9676 57.8064 97.7884 57.7976 98.5826 57.6257C99.3768 57.4538 100.128 57.1224 100.79 56.6516C102.144 55.7793 103.344 54.6877 104.34 53.4216C105.355 52.2236 106.31 50.9753 107.2 49.6816C107.89 48.6316 108.5 47.6816 109.03 46.8416C109.08 46.7316 109.19 46.7016 109.33 46.7616C109.47 46.8216 109.48 46.9716 109.42 47.0616C108.52 48.3949 107.647 49.7016 106.8 50.9816C105.982 52.2585 105.073 53.475 104.08 54.6216C103.232 55.6356 102.217 56.4979 101.08 57.1716C100.27 57.6835 99.3817 58.0585 98.45 58.2816C97.5172 58.5275 96.5443 58.582 95.59 58.4416C94.6568 58.2925 93.782 57.8914 93.06 57.2816C92.224 56.5143 91.6592 55.4968 91.45 54.3816C91.4391 52.9508 91.6002 51.5239 91.93 50.1316C92.2307 49.0486 92.6186 47.9918 93.09 46.9716C93.8643 45.5455 94.8988 44.2769 96.14 43.2316C97.1785 42.0873 98.4992 41.2356 99.97 40.7616C100.333 40.6329 100.727 40.6165 101.1 40.7146C101.472 40.8127 101.807 41.0207 102.06 41.3116C102.465 41.8967 102.658 42.6018 102.61 43.3116C102.566 44.1445 102.254 44.9409 101.72 45.5816C101.393 45.9552 100.995 46.2594 100.548 46.4758C100.101 46.6923 99.6157 46.8167 99.12 46.8416C97.9881 46.9791 96.8419 46.9453 95.72 46.7416C95.4562 46.6822 95.1959 46.6087 94.94 46.5216L95.31 46.1116Z" fill="white" />
            <path d="M10.7298 100.873C8.93981 98.5228 8.97981 94.7528 8.97981 84.8728C8.97981 74.9928 8.9798 71.4028 10.6298 69.1428C11.6298 67.6828 13.5498 67.2628 15.8598 67.2628C17.0631 67.2549 18.2636 67.379 19.4398 67.6328L18.6398 71.8228C17.7838 71.679 16.9178 71.6021 16.0498 71.5928C13.4998 71.5928 13.4998 72.9128 13.4998 84.9628C13.4998 97.4928 13.5498 98.4328 16.1398 98.4328C16.9851 98.4035 17.824 98.2759 18.6398 98.0528L19.5798 101.873C18.3738 102.325 17.0978 102.562 15.8098 102.573C13.4298 102.583 11.7598 102.163 10.7298 100.873Z" fill="white" />
            <path d="M22.9199 100.898C21.2699 98.7278 21.1799 94.8978 21.1799 84.8978C21.1799 75.1978 21.2699 71.3378 22.8299 69.1178C23.8299 67.7078 25.4599 67.2378 27.8299 67.2378C30.1999 67.2378 31.8299 67.7078 32.7699 69.0278C34.4299 71.2478 34.4299 75.1078 34.4299 84.8978C34.4299 95.2978 34.4299 98.9778 32.7399 101.048C31.8399 102.268 30.1899 102.598 27.8399 102.598C25.4899 102.598 23.8599 102.188 22.9199 100.898ZM30.0299 84.9978C30.0299 72.5678 30.0299 71.5778 27.8199 71.5778C25.6099 71.5778 25.6099 72.5778 25.6099 84.9978C25.6099 97.4178 25.6099 98.5178 27.8199 98.5178C30.0299 98.5178 30.0299 97.5278 30.0299 84.9978Z" fill="white" />
            <path d="M38.1799 67.4678H42.5099V102.368H38.1799V67.4678Z" fill="white" />
            <path d="M46.7903 67.4827H56.4903V71.7227H51.1703V82.9027H56.3503V87.0927H51.1703V102.353H46.7903V67.4827Z" fill="white" />
            <path d="M59.55 67.4827H69.2501V71.7227H63.9301V82.9027H69.11V87.0927H63.9301V102.353H59.55V67.4827Z" fill="white" />
            <path d="M72.3206 67.4927H82.1606V71.7327H76.6906V82.5227H82.0606V86.7127H76.6906V98.3427H82.2006V102.343H72.3206V67.4927Z" fill="white" />
            <path d="M85.6399 93.0216V67.3516H90.0199V93.1116C90.0199 97.1116 90.0199 98.4316 92.0899 98.4316C94.1599 98.4316 94.1599 97.1616 94.1599 93.1116V67.3516H98.4299V93.0216C98.4299 99.1416 98.0999 102.582 92.0299 102.482C85.9599 102.382 85.6399 99.2316 85.6399 93.0216Z" fill="white" />
            <path d="M101.49 67.4878H107.75C112.98 67.4878 113.59 71.0678 113.59 78.0378C113.59 83.7378 113.31 86.8478 110.77 88.3478L113.31 102.348H109.09L106.78 89.2078H105.78V102.348H101.49V67.4878ZM107.23 85.1478C109.23 85.1478 109.23 83.3178 109.23 78.3278C109.23 73.3378 109.23 71.6378 107.23 71.6378H105.73V85.1478H107.23Z" fill="white" />
        </svg>
    );
};

export default Logo;
