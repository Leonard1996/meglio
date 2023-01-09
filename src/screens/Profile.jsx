import React from 'react'
import avatar from '../assets/images/avatar.png'
import pdf from '../assets/images/pdf.png'
import download from '../assets/images/download-to-storage-drive.png'
import '../common/components/Profile.css'

function Profile() {
    return (
        <>
            <div className="row">
                <div className="col-xl-4">

                    <div className="card bg-light border-custom">
                        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                            <img src={avatar} alt="Profile picture" className="rounded-circle img-fluid" width='200' />
                            <h2>John Doe</h2>
                            <h4 className='text-muted'>Broker</h4>
                            <div className="mt-2">
                                <p className='lead'><strong>Membro da: </strong> 17/11/2022</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-xl-8">
                    <div className="card bg-light border-custom">
                        <div className="card-body pt-3">
                            <ul className="nav nav-tabs nav-tabs-bordered">
                                <li className="nav-item">
                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Generale</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Modifica Profilo</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#my-docs">Miei Documenti</button>
                                </li>

                                <li className="nav-item">
                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Cambia Password</button>
                                </li>
                            </ul>
                            <div className="tab-content pt-2">

                                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                    <h5 className="card-title mt-4 mb-2">About</h5>
                                    <p className="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</p>

                                    <h5 className="card-title my-4">Detagli Utente</h5>

                                    <div className="row my-3">
                                        <div className="col-lg-3 col-md-4 fw-semibold text-muted">Nome</div>
                                        <div className="col-lg-9 col-md-8">John</div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-lg-3 col-md-4 fw-semibold text-muted">Cognome</div>
                                        <div className="col-lg-9 col-md-8">Doe</div>
                                    </div>


                                    <div className="row my-3">
                                        <div className="col-lg-3 col-md-4 fw-semibold text-muted">Eta</div>
                                        <div className="col-lg-9 col-md-8">30</div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-lg-3 col-md-4 fw-semibold text-muted">Genere</div>
                                        <div className="col-lg-9 col-md-8">Maschio</div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-lg-3 col-md-4 fw-semibold text-muted">Compagnia</div>
                                        <div className="col-lg-9 col-md-8">Fake Company LTD</div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-lg-3 col-md-4 fw-semibold text-muted">Telefono</div>
                                        <div className="col-lg-9 col-md-8">3932323232</div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-lg-3 col-md-4 fw-semibold text-muted">Email</div>
                                        <div className="col-lg-9 col-md-8">j.doe@example.com</div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-lg-3 col-md-4 fw-semibold text-muted">Indirizzo</div>
                                        <div className="col-lg-9 col-md-8">A108 Adam Street, New York, NY 535022</div>
                                    </div>



                                </div>

                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                    <form>
                                        <div className="row mb-3">
                                            <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="email" type="email" className="form-control profile" id="email" />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="phone" className="col-md-4 col-lg-3 col-form-label">Telefono</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="phone" type="number" className="form-control profile" id="phone" />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="address" className="col-md-4 col-lg-3 col-form-label">Indirizzo</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="address" type="text" className="form-control profile" id="address" />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn green-col">Save Changes</button>
                                        </div>
                                    </form>
                                </div>

                                <div className="tab-pane fade" id="my-docs">
                                    <div className="px-3 pb-3">
                                        <div className="row mt-2">
                                            <h5 className="card-title mt-4 mb-2">Documenti Emmesi</h5>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-2 d-flex align-items-center justify-content-start">
                                                            <img src={pdf} className='img-fluid' width='30' alt="" />
                                                        </div>
                                                        <div className="col-7">
                                                            <h4>Contratti di lavoro</h4>
                                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                                        </div>
                                                        <div className="col-3 d-flex align-items-center justify-content-end">
                                                            <a href="">
                                                                <img src={download} className='img-fluid' width='30' alt="" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-2 d-flex align-items-center justify-content-start">
                                                            <img src={pdf} className='img-fluid' width='30' alt="" />
                                                        </div>
                                                        <div className="col-7">
                                                            <h4>Politica sulla riservatezza</h4>
                                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                                        </div>
                                                        <div className="col-3 d-flex align-items-center justify-content-end">
                                                            <a href="">
                                                                <img src={download} className='img-fluid' width='30' alt="" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-2 d-flex align-items-center justify-content-start">
                                                            <img src={pdf} className='img-fluid' width='30' alt="" />
                                                        </div>
                                                        <div className="col-7">
                                                            <h4>NDA</h4>
                                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                                        </div>
                                                        <div className="col-3 d-flex align-items-center justify-content-end">
                                                            <a href="">
                                                                <img src={download} className='img-fluid' width='30' alt="" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="tab-pane fade pt-3" id="profile-change-password">
                                    <form>

                                        <div className="row mb-3">
                                            <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Password Attuale</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="current_password" type="password" className="form-control" id="current_password" />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Nuovo Password</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="password" type="password" className="form-control" id="password" />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Conferma Password</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="password_confirmation" type="password" className="form-control" id="password_confirmation" />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn green-col">Cambia Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile