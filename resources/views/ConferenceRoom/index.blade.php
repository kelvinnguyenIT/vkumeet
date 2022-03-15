@extends('layouts.app')

@section('title', 'VKU-meet Phòng họp')

@section('content')
    

    <!-- List Cam Local and Remote -->
    <div class="row">
        <div class="col-lg-7 camlocal" id="localStream" ></div>
        <div class="col-lg-5 camremote" id="remoteStream" style="background-color: red;"></div>
    </div>

    <div class="listUser listUser-disapear">
        <div class="listUserTitle">
            <p style="font-family: 'Poppins', sans-serif;
                    font-size: 18px;color: #333333">People</p>
        </div>
        <div class="btn-addUser">
            <button><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#333333">
                            <path
                                d="M86,21.5c-15.83216,0 -28.66667,12.8345 -28.66667,28.66667c0,15.83216 12.8345,28.66667 28.66667,28.66667c15.83216,0 28.66667,-12.8345 28.66667,-28.66667c0,-15.83216 -12.8345,-28.66667 -28.66667,-28.66667zM129,86c-23.65,0 -43,19.35 -43,43c0,23.65 19.35,43 43,43c23.65,0 43,-19.35 43,-43c0,-23.65 -19.35,-43 -43,-43zM79.19726,100.66927c-22.64667,1.87767 -57.69726,12.5354 -57.69726,31.91406v17.91667h54.37989c-2.69467,-6.6435 -4.21322,-13.889 -4.21322,-21.5c0,-10.32 2.7576,-19.96723 7.5306,-28.33073zM129,107.5c3.956,0 7.16667,3.21067 7.16667,7.16667v7.16667h7.16667c3.956,0 7.16667,3.21067 7.16667,7.16667c0,3.956 -3.21067,7.16667 -7.16667,7.16667h-7.16667v7.16667c0,3.956 -3.21067,7.16667 -7.16667,7.16667c-3.956,0 -7.16667,-3.21067 -7.16667,-7.16667v-7.16667h-7.16667c-3.956,0 -7.16667,-3.21067 -7.16667,-7.16667c0,-3.956 3.21067,-7.16667 7.16667,-7.16667h7.16667v-7.16667c0,-3.956 3.21067,-7.16667 7.16667,-7.16667z">
                            </path>
                        </g>
                    </g>
                </svg>
                <span>Add people</span></button>
        </div>

        <div class="userInRoom" id="raseHandRoom" >
            <p style="color: #333333;font-family: 'Poppins', sans-serif;">Rase hand</p>

        </div>
        <div class="userInRoom" id="userInRoom">
            <p style="color: #333333;font-family: 'Poppins', sans-serif;">In call</p>

        </div>
    </div>


    <div class="infoRoom infoRoom-disapear">
        <div class="infoRoomTitle">
            <p style="font-family: 'Poppins', sans-serif;
                    font-size: 18px;color: #333333">Meeting details</p>
        </div>
        <div class="infoRoomDetail">
            <p style="color: #333333;font-family: 'Poppins', sans-serif;">Joining info</p>
            <p style="color: #333333;font-family: 'Poppins', sans-serif;">To join the video meeting, click this link:
                https://meet.google.com/xfy-hfee-hoq
                Otherwise, to join by phone, dial +1 318-431-0769 and enter this PIN: 702 294 299#</p>
        </div>
        <div class="btn-addUser">
            <button><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#333333">
                            <path
                                d="M43,13.4375v129h102.125v-80.21033c0,-5.47444 -1.93311,-10.77515 -5.45374,-14.96496l-23.81482,-28.33423c-2.92669,-3.48031 -7.23681,-5.49048 -11.78406,-5.49048zM53.75,24.1875h47.55615c8.84188,0 11.56885,3.66865 11.56885,6.93396c0,4.79719 -5.375,11.87854 -5.375,11.87854c26.23269,12.41625 26.38159,12.41235 26.38159,21.99866c0,13.4375 0.49341,66.68884 0.49341,66.68884h-80.625zM26.875,29.5625v118.25v8.0625v2.6875h102.125v-8.0625l-91.375,-2.6875l-2.6875,-118.25z">
                            </path>
                        </g>
                    </g>
                </svg>
                <span>Copy joining info</span></button>
        </div>

    </div>

    <div class="chatboxRoom chatboxRoom-disapear">
        <div class="chatboxRoomTitle">
            <p style="font-family: 'Poppins', sans-serif;
                    font-size: 18px;color: #333333">In-call messages</p>
        </div>
        <div class="chatboxRoomWarning">
            <span style="color: #333333;font-family: 'Poppins', sans-serif;font-size: 12px;">Messages can only be seen by
                people in the call and are deleted when the call ends.</span>
        </div>
        <div class="chatboxConversation">
            <div class="chatboxConversationView">
                
            </div>
            <div class="chatboxInputText">
                <input type="text" id="inputMessage" placeholder="Send a message to everyone" style="font-family: 'Poppins', sans-serif;
                        color: #333333;" required/>
                <button id="btnSendMessage"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                        style=" fill:#000000;">
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                            stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                            font-family="none" font-weight="none" font-size="none" text-anchor="none"
                            style="mix-blend-mode: normal">
                            <path d="M0,172v-172h172v172z" fill="none"></path>
                            <g fill="#333333">
                                <path
                                    d="M10.07813,10.16211l20.24024,65.08789h130.93164zM30.31836,86l-20.24024,65.0459l151.17188,-65.0459z">
                                </path>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>

    </div>
    {{-- Bottom Bar --}}
    <div class="bottomBar">
        <div class="detailRoom">
            <div class="clockRoom">
                <span id="clockRoom"></span>
                <span>|</span>
                <script src="{{ asset('/js/getTimeCurrent.js') }}"></script>
            </div>

            <div class="idRoom">
                <span>{{ $idRoom }}</span>
            </div>
        </div>

        {{-- Some Operation Room such as off,mute mic and video button --}}
        <div class="operationRoom">
            <button id="btnAudio">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path
                                d="M86,14.33333c-11.87517,0 -21.5,9.62483 -21.5,21.5v43c0,11.87517 9.62483,21.5 21.5,21.5c11.87517,0 21.5,-9.62483 21.5,-21.5v-43c0,-11.87517 -9.62483,-21.5 -21.5,-21.5zM43.62988,78.83333c-4.343,0 -7.841,3.85365 -7.13867,8.14649c3.5108,21.49797 20.70692,38.35796 42.34212,41.46028v14.89323c0,3.956 3.21067,7.16667 7.16667,7.16667c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.89323c21.63521,-3.10233 38.83133,-19.96231 42.34212,-41.46028c0.70233,-4.29283 -2.79567,-8.14649 -7.13867,-8.14649c-3.54033,0 -6.45985,2.60553 -7.05469,6.10286c-2.9025,16.87751 -17.60659,29.73047 -35.31543,29.73047c-17.70883,0 -32.41293,-12.85297 -35.31543,-29.73047c-0.59483,-3.49733 -3.50719,-6.10286 -7.05469,-6.10286z">
                            </path>
                        </g>
                    </g>
                </svg>
            </button>
            <button id="btnVideo">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path
                                d="M21.5,35.83333c-7.83362,0 -14.33333,6.49972 -14.33333,14.33333v71.66667c0,7.83362 6.49972,14.33333 14.33333,14.33333h93.16667c7.83362,0 14.33333,-6.49972 14.33333,-14.33333v-20.92611l35.83333,28.66667v-87.14779l-35.83333,28.66667v-20.92611c0,-7.83362 -6.49972,-14.33333 -14.33333,-14.33333zM21.5,50.16667h93.16667v71.66667h-93.16667zM150.5,72.25456v27.49089l-17.18881,-13.74544z">
                            </path>
                        </g>
                    </g>
                </svg>
            </button>
            <button id="btnShareScreen">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 226 226"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,226v-226h226v226z" fill="none"></path>
                        <g fill="#ffffff">
                            <path
                                d="M218.55707,30.23127c0.07533,-4.14333 -3.23933,-7.60867 -7.38267,-7.60867h-196.09267c-4.14333,-0.07533 -7.60867,3.23933 -7.684,7.38267c0,4.21867 3.31467,7.60867 7.458,7.684h196.09267c4.14333,0 7.53333,-3.31467 7.60867,-7.458zM195.88173,180.8226c8.28667,0 15.06667,-6.78 15.06667,-15.06667v-113h-195.86667v113c0,8.28667 6.70467,15.06667 15.06667,15.06667h75.33333v9.56733c-4.67067,2.63667 -7.53333,7.60867 -7.53333,13.03267c0,8.28667 6.70467,15.06667 15.06667,15.06667c8.28667,0 15.06667,-6.78 15.06667,-15.06667c0,-5.424 -2.86267,-10.396 -7.53333,-13.03267v-9.56733z">
                            </path>
                        </g>
                    </g>
                </svg>
            </button>
            <button id="btnRaseHand">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path
                                d="M89.44,0c-8.46562,0 -13.76,7.14875 -13.76,13.76v2.0425c-2.16344,-1.22281 -4.515,-2.0425 -6.88,-2.0425c-6.45,0 -13.63906,4.82406 -14.0825,13.2225c0,0.06719 0,0.14781 0,0.215v73.8525l-11.18,-13.4375c-0.02687,-0.06719 -0.06719,-0.14781 -0.1075,-0.215c-5.75125,-6.19469 -15.61437,-6.08719 -21.715,-0.1075c-0.02687,0.02688 0.02688,0.08063 0,0.1075c-6.07375,5.71094 -6.11406,15.30531 -0.3225,21.3925l0.215,0.3225l39.6675,50.8475c5.805,7.74 14.79469,12.04 24.4025,12.04h27.8425c17.01188,0 30.96,-13.94812 30.96,-30.96v-99.76c0,-2.56656 -0.13437,-6.49031 -1.935,-10.2125c-1.80062,-3.72219 -5.93937,-6.9875 -11.825,-6.9875c-2.72781,0 -4.945,0.91375 -6.88,2.0425v-2.0425c0,-5.22719 -0.91375,-9.43312 -3.3325,-12.5775c-2.41875,-3.14437 -6.30219,-4.6225 -10.4275,-4.6225c-3.1175,0 -5.60344,1.02125 -7.74,2.365c-1.77375,-4.98531 -6.36937,-9.245 -12.9,-9.245zM89.44,6.88c4.60906,0 6.88,3.87 6.88,6.88v61.92h6.88v-55.04c0,-1.84094 0.45688,-3.66844 1.3975,-4.8375c0.94063,-1.16906 2.32469,-2.0425 5.4825,-2.0425c2.75469,0 4.03125,0.60469 5.0525,1.935c1.02125,1.33031 1.8275,3.9775 1.8275,8.385v58.48h6.88v-41.28c0,-2.24406 0.22844,-5.24062 1.1825,-7.2025c0.95406,-1.96187 1.94844,-3.1175 5.6975,-3.1175c3.74906,0 4.74344,1.15563 5.6975,3.1175c0.95406,1.96188 1.1825,4.95844 1.1825,7.2025v99.76c0,13.26281 -10.81719,24.08 -24.08,24.08h-27.8425c-7.59219,0 -14.405,-3.225 -18.92,-9.245c-0.04031,-0.04031 -0.06719,-0.06719 -0.1075,-0.1075l-39.8825,-51.2775c-0.06719,-0.1075 -0.13437,-0.215 -0.215,-0.3225c-3.5475,-3.5475 -3.50719,-8.66719 -0.1075,-11.825c0.04031,-0.04031 0.06719,-0.06719 0.1075,-0.1075c3.50719,-3.50719 8.54625,-3.50719 11.7175,-0.215c0.04031,0.04031 0.06719,0.06719 0.1075,0.1075l17.0925,20.5325c0.92719,1.15563 2.48594,1.59906 3.88344,1.08844c1.38406,-0.52406 2.29781,-1.86781 2.24406,-3.34594v-83.205c0.30906,-4.59562 4.05813,-6.5575 7.2025,-6.5575c1.58563,0 3.44,0.60469 4.73,1.72c1.29,1.11531 2.15,2.63375 2.15,5.16v51.6h6.88v-65.36c0,-3.01 2.27094,-6.88 6.88,-6.88z">
                            </path>
                        </g>
                    </g>
                </svg>
            </button>
            <button id="#">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path
                                d="M28.66667,21.5c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667h14.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667zM78.83333,21.5c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667h14.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667zM129,21.5c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667h14.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667zM28.66667,71.66667c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667h14.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667zM78.83333,71.66667c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667h14.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667zM129,71.66667c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667h14.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667zM28.66667,121.83333c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667h14.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667zM78.83333,121.83333c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667h14.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667zM129,121.83333c-3.956,0 -7.16667,3.21067 -7.16667,7.16667v14.33333c0,3.956 3.21067,7.16667 7.16667,7.16667h14.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667v-14.33333c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667z">
                            </path>
                        </g>
                    </g>
                </svg>
            </button>
            <button id="btnOffRoom" style="background-color: #ea4335">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path
                                d="M131.75469,22.87734c-0.21364,0.00675 -0.42673,0.02544 -0.63828,0.05599h-27.62526c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h14.5349l-32.02604,32.02604l-36.07969,-36.07969c-1.43802,-1.49775 -3.57339,-2.10107 -5.58257,-1.57728c-2.00918,0.52378 -3.57822,2.09283 -4.10201,4.10201c-0.52378,2.00918 0.07954,4.14455 1.57728,5.58257l40.13333,40.13333c2.23904,2.23811 5.86825,2.23811 8.10729,0l36.07969,-36.07969v14.5349c-0.02924,2.06765 1.05709,3.99087 2.843,5.03322c1.78592,1.04236 3.99474,1.04236 5.78066,0c1.78592,-1.04236 2.87225,-2.96558 2.843,-5.03322v-27.64766c0.23111,-1.67076 -0.28511,-3.35853 -1.41129,-4.61415c-1.12617,-1.25562 -2.74806,-1.95172 -4.43402,-1.90304zM86.0112,91.73333c-64.6032,0 -74.54453,19.04819 -74.54453,36.22526c0,5.504 1.43118,9.31927 2.95625,11.8362c1.57093,2.57427 4.59007,3.80837 7.5026,3.04583c7.2756,-1.90346 22.96997,-6.00799 30.24557,-7.90573c2.3908,-0.62493 4.21857,-2.49149 4.8263,-4.88229l3.06823,-12.12735c0.688,-2.71187 2.93601,-4.71199 5.71094,-5.05026c4.7988,-0.59053 12.68384,-1.38854 20.23464,-1.38854c7.5508,0 15.41891,0.79801 20.22344,1.38854c2.77493,0.344 5.02294,2.33839 5.71094,5.05026l3.06823,12.12735c0.60773,2.39653 2.4579,4.26309 4.8487,4.88229l30.18958,7.89453c2.924,0.76253 5.971,-0.47703 7.5362,-3.05703c1.51933,-2.50547 2.94505,-6.327 2.94505,-11.8138c0,-17.17707 -9.91894,-36.22526 -74.52214,-36.22526z">
                            </path>
                        </g>
                    </g>
                </svg></button>
        </div>

        <div class="conversationRoom">
            <button id="btnInfoRoom">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path
                                d="M86,53.75c9.87925,0 17.91667,-8.03742 17.91667,-17.91667c0,-9.87925 -8.03742,-17.91667 -17.91667,-17.91667c-9.87925,0 -17.91667,8.03742 -17.91667,17.91667c0,9.87925 8.03742,17.91667 17.91667,17.91667zM116.45833,143.33333h-12.54167v-62.70833c0,-10.86825 -8.84008,-19.70833 -19.70833,-19.70833h-26.875c-2.97058,0 -5.375,2.40442 -5.375,5.375c0,2.97058 2.40442,5.375 5.375,5.375h10.75v71.66667h-10.75c-2.97058,0 -5.375,2.40442 -5.375,5.375c0,2.97058 2.40442,5.375 5.375,5.375h59.125c2.97058,0 5.375,-2.40442 5.375,-5.375c0,-2.97058 -2.40442,-5.375 -5.375,-5.375z">
                            </path>
                        </g>
                    </g>
                </svg>
            </button>
            <button id="btnListUser">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path
                                d="M53.75,37.625c-14.82324,0 -26.875,12.05176 -26.875,26.875c0,14.82324 12.05176,26.875 26.875,26.875c14.82324,0 26.875,-12.05176 26.875,-26.875c0,-14.82324 -12.05176,-26.875 -26.875,-26.875zM53.75,91.375c-26.66504,0 -48.375,21.68896 -48.375,48.375h96.75c0,-5.27002 -0.96582,-10.37207 -2.51953,-15.11719c0.5459,-1.19678 1.13379,-2.39355 1.84766,-3.52734c5.24903,-8.20947 14.36133,-13.60547 24.85938,-13.60547c16.39795,0 29.5625,13.16455 29.5625,29.5625v2.6875h10.75v-2.6875c0,-15.6001 -8.96533,-29.24756 -22.00391,-35.94531c6.84473,-5.41699 11.25391,-13.81543 11.25391,-23.17969c0,-16.27197 -13.29053,-29.5625 -29.5625,-29.5625c-16.27197,0 -29.5625,13.29053 -29.5625,29.5625c0,9.44824 4.47217,17.93067 11.42188,23.34766c-5.56396,2.83447 -10.39307,6.78174 -14.10937,11.75781c-8.67139,-13.03857 -23.51562,-21.66797 -40.3125,-21.66797zM126.3125,59.125c10.45606,0 18.8125,8.35645 18.8125,18.8125c0,10.45606 -8.35644,18.8125 -18.8125,18.8125c-10.45605,0 -18.8125,-8.35644 -18.8125,-18.8125c0,-10.45605 8.35645,-18.8125 18.8125,-18.8125z">
                            </path>
                        </g>
                    </g>
                </svg></button>
            <button id="btnChatboxRoom">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path
                                d="M86,14.33333c-39.06827,0 -71.66667,28.48057 -71.66667,64.5c0,36.01943 32.5984,64.5 71.66667,64.5c2.48087,0 4.76697,-0.49787 7.16667,-0.72786v22.89974l11.04395,-7.08268c15.49564,-9.94565 49.04882,-35.76206 53.05012,-72.81446c0.25369,-2.2042 0.40593,-4.46173 0.40593,-6.77474c0,-36.01943 -32.5984,-64.5 -71.66667,-64.5zM86,28.66667c32.18273,0 57.33333,22.86143 57.33333,50.16667c0,1.72428 -0.10685,3.44449 -0.30794,5.17903v0.02799l-0.014,0.028c-2.47666,22.93735 -20.83761,40.95306 -35.51139,52.70019v-10.83398l-8.58041,1.73567c-4.19717,0.84726 -8.50976,1.32975 -12.91959,1.32975c-32.18273,0 -57.33333,-22.86143 -57.33333,-50.16667c0,-27.30523 25.1506,-50.16667 57.33333,-50.16667zM50.16667,71.66667v14.33333h14.33333v-14.33333zM78.83333,71.66667v14.33333h14.33333v-14.33333zM107.5,71.66667v14.33333h14.33333v-14.33333z">
                            </path>
                        </g>
                    </g>
                </svg></button>
            <button id="#">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172"
                    style=" fill:#000000;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path
                                d="M120.17114,20.76514l-33.15283,59.85986h66.30567zM120.17114,42.94751l14.90722,26.92749h-29.81445zM48.375,86c-17.78587,0 -32.25,14.46412 -32.25,32.25c0,17.78588 14.46413,32.25 32.25,32.25c17.78587,0 32.25,-14.46412 32.25,-32.25c0,-17.78588 -14.46413,-32.25 -32.25,-32.25zM91.375,91.375v59.125h59.125v-59.125zM48.375,96.75c11.85725,0 21.5,9.64275 21.5,21.5c0,11.85725 -9.64275,21.5 -21.5,21.5c-11.85725,0 -21.5,-9.64275 -21.5,-21.5c0,-11.85725 9.64275,-21.5 21.5,-21.5zM102.125,102.125h37.625v37.625h-37.625z">
                            </path>
                        </g>
                    </g>
                </svg> </button>
        </div>
    </div>

    <div class="modalStatusUser w3-animate-bottom" id="userStatusContainer">
        <p id="userStatus">fasfaf</p>
    </div>


    <script src="https://cdn.socket.io/4.4.0/socket.io.min.js"
        integrity="sha384-1fOn6VtTq3PWwfsOrk45LnYcGosJwzMHv+Xh/Jx5303FVOXzEnw0EpLv30mtjmlj" crossorigin="anonymous">
    </script>
    <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>
    <script src="/js/room.js"></script>
    <script>
        RTCConnection("{{ $idRoom }}", [{
            avatar: "{{ session('avatar') }}",
            email: "{{ session('email') }}",
            name: "{{ session('name') }}"
        }]);
    </script>
    <script src="{{ asset('/js/offRoom.js') }}"></script>
@endsection
{{-- <div class="dropup"> --}}
{{-- <div id="myDropup" class="dropup-content">
                    <div class="dropupContentTitle">
                        <p>
                            <svg width="1.2em" height="1.2em" style="margin-right: 2%" viewBox="0 0 16 16" class="bi bi-info-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>Chi tiết
                        </p>
                    </div>
                    <div class="dropupContentDetail">
                        <p style="margin-top: 10px"><b>Thông tin chi tiết về tham gia phòng họp</b></p>
                        <p style="margin-bottom: 0px" >{{url()->full()}}</p>
                        <button class="copyUrlRoom" onclick="copyToClipboard('{{url()->full()}}')">
                            <b>
                                <svg width="1.4em" height="1.4em" viewBox="0 0 16 16" class="bi bi-link-45deg" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"/>
                                </svg>Sao chép thông tin tham gia phòng họp
                            </b>
                        </button>
                    </div>
                </div> --}}
{{-- </div> --}}
