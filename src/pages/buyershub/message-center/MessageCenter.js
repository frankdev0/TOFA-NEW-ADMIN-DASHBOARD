import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import avatar1 from '../../../assets/avatar-1.jpg'

const MessageCenter = () => {

 
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    // (function() {
    //     'use strict';
    //     window.addEventListener('load', function() {
    //         // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //         var forms = document.getElementsByClassName('needs-validation');
    //         // Loop over them and prevent submission
    //         var validation = Array.prototype.filter.call(forms, function(form) {
    //             form.addEventListener('submit', function(event) {
    //                 if (form.checkValidity() === false) {
    //                     event.preventDefault();
    //                     event.stopPropagation();
    //                 }
    //                 form.classList.add('was-validated');
    //             }, false);
    //         });
    //     }, false);
    // })();
    
  return (
    <div>
     
    {/* <!-- main wrapper --> */}
    <div className="dashboard-main-wrapper">
        {/* <!-- navbar --> */}
       <Navbar/>

        {/* <!-- left sidebar --> */}
       <Sidebar/>


        {/* <!-- wrapper  --> */}
        <div className="dashboard-wrapper">
            <div className="container-fluid pr-0">
                
                <div className="page-aside">
                    <div className="aside-content">
                        <div className="aside-header border-bottom">
                            <button className="navbar-toggle" data-target=".aside-nav" data-toggle="collapse" type="button"><span className="icon"><i className="fas fa-caret-down"></i></span></button><span className="title">Message Center</span>
                        </div>
                        <div className="aside-nav collapse aside-body">
 
                            <div className="chat-list">

                                <a href="comingsoon" className="btn-account" role="button" style={{textDecoration:'none'}}>
                                    <span className="user-avatar">
                                        <img src={avatar1} alt="User Avatar" className="user-avatar-lg rounded-circle"/>
                                    </span>
                                    <div className="account-summary">
                                        <h5 className="account-name">John Abraham</h5>
                                        <span className="account-description">john.ab@gmail.com</span>
                                    </div>
                                </a>
                                <hr/>

                                <a href="comingsoon" className="btn-account" role="button">
                                    <span className="user-avatar">
                                        <img src={avatar1} alt="User Avatar" className="user-avatar-lg rounded-circle"/>
                                    </span>
                                    <div className="account-summary">
                                        <h5 className="account-name">John Abraham</h5>
                                        <span className="account-description">john.ab@gmail.com</span>
                                    </div>
                                </a>
                                <hr/>

                                <a href="comingsoon" className="btn-account" role="button">
                                    <span className="user-avatar">
                                        <img src={avatar1} alt="User Avatar" className="user-avatar-lg rounded-circle"/>
                                    </span>
                                    <div className="account-summary">
                                        <h5 className="account-name">John Abraham</h5>
                                        <span className="account-description">john.ab@gmail.com</span>
                                    </div>
                                </a>
                                <hr/>

                                <a href="comingsoon" className="btn-account" role="button">
                                    <span className="user-avatar">
                                        <img src={avatar1} alt="User Avatar" className="user-avatar-lg rounded-circle"/>
                                    </span>
                                    <div className="account-summary">
                                        <h5 className="account-name">John Abraham</h5>
                                        <span className="account-description">john.ab@gmail.com</span>
                                    </div>
                                </a>
                                <hr/>

                                <a href="comingsoon" className="btn-account" role="button">
                                    <span className="user-avatar">
                                        <img src={avatar1} alt="User Avatar" className="user-avatar-lg rounded-circle"/>
                                    </span>
                                    <div className="account-summary">
                                        <h5 className="account-name">John Abraham</h5>
                                        <span className="account-description">john.ab@gmail.com</span>
                                    </div>
                                </a>
                                <hr/>

                                <a href="comingsoon" className="btn-account" role="button">
                                    <span className="user-avatar">
                                        <img src={avatar1} alt="User Avatar" className="user-avatar-lg rounded-circle"/>
                                    </span>
                                    <div className="account-summary">
                                        <h5 className="account-name">John Abraham</h5>
                                        <span className="account-description">john.ab@gmail.com</span>
                                    </div>
                                </a>
                                <hr/>

                                <a href="comingsoon" className="btn-account" role="button">
                                    <span className="user-avatar">
                                        <img src={avatar1} alt="User Avatar" className="user-avatar-lg rounded-circle"/>
                                    </span>
                                    <div className="account-summary">
                                        <h5 className="account-name">John Abraham</h5>
                                        <span className="account-description">john.ab@gmail.com</span>
                                    </div>
                                </a>
                                <hr/>

                                <a href="comingsoon" className="btn-account" role="button">
                                    <span className="user-avatar">
                                        <img src={avatar1} alt="User Avatar" className="user-avatar-lg rounded-circle"/>
                                    </span>
                                    <div className="account-summary">
                                        <h5 className="account-name">John Abraham</h5>
                                        <span className="account-description">john.ab@gmail.com</span>
                                    </div>
                                </a>
                                <hr/>

                                <a href="comingsoon" className="btn-account" role="button">
                                    <span className="user-avatar">
                                        <img src={avatar1} alt="User Avatar" className="user-avatar-lg rounded-circle"/>
                                    </span>
                                    <div className="account-summary">
                                        <h5 className="account-name">John Abraham</h5>
                                        <span className="account-description">john.ab@gmail.com</span>
                                    </div>
                                </a>
                                <hr/>

                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="main-content container-fluid p-0">
                    <div className="chat-header bg-white border-bottom">
                        <h2 className="active-user-chat">John Abraham</h2>
                    </div>
                    <div className="content-container">
                        <div className="chat-module">
                            <div className="chat-module-top">
                                <div className="chat-module-body border-bottom">
                                    <div className="media chat-item">
                                        <img alt="William" src={avatar1} className="rounded-circle user-avatar-lg" />
                                        <div className="media-body">
                                            <div className="chat-item-title">
                                                <span className="chat-item-author">William</span>
                                                <span>4 days ago</span>
                                            </div>
                                            <div className="chat-item-body">
                                                <p>Hey guys, Phasellus imperdiet arcu venenatis, malesuada nulla a, porta sem. Curabitur nec massa ultrices, consequat erat sit amet, luctus justo. Brand Concept &amp; Design!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="media chat-item">
                                        <img alt="Komal" src={avatar1} className="rounded-circle user-avatar-lg" />
                                        <div className="media-body">
                                            <div className="chat-item-title">
                                                <span className="chat-item-author">Komal</span>
                                                <span>4 days ago</span>
                                            </div>
                                            <div className="chat-item-body">
                                                <p>Nice one <a href="comingsoon">@Komal</a>, Nulla ut diam porttitor odio malesuada malesuada eu at ipsum.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="media chat-item">
                                        <img alt="tanu" src={avatar1} className="rounded-circle user-avatar-lg" />
                                        <div className="media-body">
                                            <div className="chat-item-title">
                                                <span className="chat-item-author">Tanu</span>
                                                <span>3 days ago</span>
                                            </div>
                                            <div className="chat-item-body">
                                                <p>Roger that boss! <a href="comingsoon">@Ravi</a> Donec quis ante ut felis tincidunt blandit.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="media chat-item">
                                        <img alt="Bhoomi" src={avatar1} className="rounded-circle user-avatar-lg" />
                                        <div className="media-body">
                                            <div className="chat-item-title">
                                                <span className="chat-item-author">Bhoomi</span>
                                                <span>3 days ago</span>
                                            </div>
                                            <div className="chat-item-body">
                                                {/* <h1 id="-"><span>😉</span></h1> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="media chat-item">
                                        <img alt="William" src={avatar1} className="rounded-circle user-avatar-lg" />
                                        <div className="media-body">
                                            <div className="chat-item-title">
                                                <span className="chat-item-author">William</span>
                                                <span>2 days ago</span>
                                            </div>
                                            <div className="chat-item-body">
                                                <p>Can't wait! <a href="comingsoon">@David</a> Curabitur nec massa ultrices, consequat erat sit amet, luctus justo. <a href="comingsoon">  Meeting</a>?</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="media chat-item">
                                        <img alt="Daniel" src={avatar1} className="rounded-circle user-avatar-lg" />
                                        <div className="media-body">
                                            <div className="chat-item-title">
                                                <span className="chat-item-author">Daniel</span>
                                                <span>Yesterday</span>
                                            </div>
                                            <div className="chat-item-body">
                                                <p>Quisque condimentum elit quis nibh condimentum, in maximus tortor viverra. 🤓</p>
                                            </div>
                                            <div className="media media-attachment">
                                                <div className="avatar bg-primary">
                                                    <i className="fas fa-file"></i>
                                                </div>
                                                <div className="media-body">
                                                    <a href="comingsoon" className="">questionnaire-draft.doc</a>
                                                    <span>24kb Document</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="media chat-item">
                                        <img alt="Fallon" src={avatar1} className="rounded-circle user-avatar-lg" />
                                        <div className="media-body">
                                            <div className="chat-item-title">
                                                <span className="chat-item-author">Fallon</span>
                                                <span>2 hours ago</span>
                                            </div>
                                            <div className="chat-item-body">
                                                <p>Great start guys, Fusce tempus ipsum a mi rutrum, at dignissim mauris vulputate.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="media chat-item">
                                        <img alt="Kimberly" src={avatar1} className="rounded-circle user-avatar-lg" />
                                        <div className="media-body">
                                            <div className="chat-item-title">
                                                <span className="chat-item-author">Kimberly</span>
                                                <span>Just now</span>
                                            </div>
                                            <div className="chat-item-body">
                                                <p>Well done <a href="comingsoon">@all</a>. See you all Fusce tempus ipsum a mi rutrum, at dignissim mauris vulputate. 🤜</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-module-bottom">
                                <div align="right">
                                    <a href="comingsoon" className="btn btn-rounded btn-outline-dark mb-3 chat-btn" data-toggle="modal" data-target="#exampleModal">Start Order</a>
                                </div>
                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Place New Order</h5>
                                                <a href="comingsoon" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </a>
                                            </div>
                                            <div className="modal-body">
                                                <p>Woohoo, You are readng this text in a modal! Use Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content.</p>
                                            </div>
                                            <div className="modal-footer">
                                                <a href="comingsoon" className="btn btn-secondary" data-dismiss="modal">Close</a>
                                                <a href="comingsoon" className="btn btn-primary">Save changes</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form className="chat-form">
                                    <textarea className="form-control" placeholder="Type message" rows="1"></textarea>
                                    <div className="chat-form-buttons">
                                        <button type="button" className="btn btn-link">
                                            <i className="far fa-smile"></i>
                                        </button>
                                        <div className="custom-file custom-file-naked">
                                            <input type="file" className="custom-file-input" id="customFile" style={{display:'none'}}/>
                                            <label className="custom-file-label" for="customFile">
                                                <i className="fas fa-paperclip"></i>
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
                

            {/* <!-- footer --> */}
           {/* <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            Copyright © 2018 Concept. All rights reserved. Dashboard by <a href="https://colorlib.com/wp/">Colorlib</a>.
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="text-md-right footer-links d-none d-sm-block">
                                <a href="javascript: void(0);">About</a>
                                <a href="javascript: void(0);">Support</a>
                                <a href="javascript: void(0);">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- end footer --> */}

        </div>
        {/* <!-- end main wrapper --> */}

    </div>
    {/* <!-- end main wrapper --> */}


    {/* <!-- Optional JavaScript -->
    <!-- jquery 3.3.1 -->
    <script src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
    <!-- bootstap bundle js -->
    <script src="assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
    <!-- slimscroll js -->
    <script src="assets/vendor/slimscroll/jquery.slimscroll.js"></script>
    <script src="../assets/vendor/multi-select/js/jquery.multi-select.js"></script>
    <!-- main js -->
    <script src="assets/libs/js/main-js.js"></script>
    <!-- chart chartist js -->
    <script src="assets/vendor/charts/chartist-bundle/chartist.min.js"></script>
    <!-- sparkline js -->
    <script src="assets/vendor/charts/sparkline/jquery.sparkline.js"></script>
    <!-- morris js -->
    <script src="assets/vendor/charts/morris-bundle/raphael.min.js"></script>
    <script src="assets/vendor/charts/morris-bundle/morris.js"></script>
    <!-- chart c3 js -->
    <script src="assets/vendor/charts/c3charts/c3.min.js"></script>
    <script src="assets/vendor/charts/c3charts/d3-5.4.0.min.js"></script>
    <script src="assets/vendor/charts/c3charts/C3chartjs.js"></script>
    <script src="assets/libs/js/dashboard-ecommerce.js"></script>
    <!-- Data tables -->
    <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
    <script src="assets/vendor/datatables/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
    <script src="assets/vendor/datatables/js/buttons.bootstrap4.min.js"></script>
    <script src="assets/vendor/datatables/js/data-table.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.colVis.min.js"></script>
    <script src="https://cdn.datatables.net/rowgroup/1.0.4/js/dataTables.rowGroup.min.js"></script>
    <script src="https://cdn.datatables.net/select/1.2.7/js/dataTables.select.min.js"></script>
    <script src="https://cdn.datatables.net/fixedheader/3.1.5/js/dataTables.fixedHeader.min.js"></script>
    <!-- Form validation -->
    <script src="../assets/vendor/parsley/parsley.js"></script>
    <script>
    $('#form').parsley();
    </script> */}
  

    </div>
    </div>
  )
}

export default MessageCenter